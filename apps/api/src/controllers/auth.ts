import axios from "axios";
import bcrypt from "bcrypt";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { track } from "../lib/hog";
import { checkToken } from "../lib/jwt";
import { forgotPassword } from "../lib/nodemailer/auth/forgot-password";
import { checkSession } from "../lib/session";
import { prisma } from "../prisma";
import { getConfig, getOAuthProvider } from "../lib/auth";
import { getOidcClient } from "../lib/utils/oidc_client";
import { getOAuthClient } from "../lib/utils/oauth_client";
import { AuthorizationCode } from "simple-oauth2";

async function getUserEmails(token: string) {
  const res = await axios.get("https://api.github.com/user/emails", {
    headers: {
      Authorization: `token ${token}`,
    },
  });

  // Return only the primary email address
  const primaryEmail = res.data.find((email: { primary: boolean }) => email.primary);
  return primaryEmail ? primaryEmail.email : null; // Return the email or null if not found
}

export function authRoutes(fastify: FastifyInstance) {
  // Register a new user
  fastify.post(
    "/api/v1/auth/user/register",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            email: { type: "string" },
            password: { type: "string" },
            admin: { type: "boolean" },
            name: { type: "string" },
          },
          required: ["email", "password", "name", "admin"],
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];

      let { email, password, admin, name } = request.body as {
        email: string;
        password: string;
        admin: boolean;
        name: string;
      };

      if (bearer) {
        const token = checkToken(bearer);
        if (token) {
          const requester = await checkSession(bearer);

          if (!requester?.isAdmin) {
            return reply.code(401).send({
              message: "Unauthorized",
            });
          }

          // Checks if email already exists
          let record = await prisma.user.findUnique({
            where: { email },
          });

          // if exists, return 400
          if (record) {
            return reply.code(400).send({
              message: "Email already exists",
            });
          }

          const user = await prisma.user.create({
            data: {
              email,
              password: await bcrypt.hash(password, 10),
              name,
              isAdmin: admin,
            },
          });

          const hog = track();

          hog.capture({
            event: "user_registered",
            distinctId: user.id,
          });

          reply.send({
            success: true,
          });
        }
      }
    }
  );

  // Register a new external user
  fastify.post(
    "/api/v1/auth/user/register/external",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            email: { type: "string" },
            password: { type: "string" },
            name: { type: "string" },
            language: { type: "string" },
          },
          required: ["email", "password", "name"],
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      // const bearer = request.headers.authorization!.split(" ")[1];

      let { email, password, name, language } = request.body as {
        email: string;
        password: string;
        name: string;
        language: string;
      };

      // Checks if email already exists
      let record = await prisma.user.findUnique({
        where: { email },
      });

      // if exists, return 400
      if (record) {
        return reply.code(400).send({
          message: "Email already exists",
        });
      }

      const user = await prisma.user.create({
        data: {
          email,
          password: await bcrypt.hash(password, 10),
          name,
          isAdmin: false,
          language,
          external_user: true,
          firstLogin: false,
        },
      });

      const hog = track();

      hog.capture({
        event: "user_registered",
        distinctId: user.id,
      });

      reply.send({
        success: true,
      });
    }
  );

  // Forgot password & generate code
  fastify.post(
    "/api/v1/auth/password-reset",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { email, link } = request.body as { email: string; link: string };

      let user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return reply.code(401).send({
          message: "Invalid email",
          success: false,
        });
      }

      function generateRandomCode(length = 6) {
        const min = Math.pow(10, length - 1); // Minimum number for the given length
        const max = Math.pow(10, length) - 1; // Maximum number for the given length
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      const code = generateRandomCode();

      const uuid = await prisma.passwordResetToken.create({
        data: {
          userId: user!.id,
          code: String(code),
        },
      });

      forgotPassword(email, String(code), link, uuid.id);

      reply.send({
        success: true,
      });
    }
  );

  // Check code & uuid us valid
  fastify.post(
    "/api/v1/auth/password-reset/code",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { code, uuid } = request.body as { code: string; uuid: string };

      const reset = await prisma.passwordResetToken.findUnique({
        where: { code: code, id: uuid },
      });

      if (!reset) {
        reply.code(401).send({
          message: "Invalid Code",
          success: false,
        });
      } else {
        reply.send({
          success: true,
        });
      }
    }
  );

  // Reset users password via code
  fastify.post(
    "/api/v1/auth/password-reset/password",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { password, code } = request.body as {
        password: string;
        code: string;
      };

      const user = await prisma.passwordResetToken.findUnique({
        where: { code: code },
      });

      if (!user) {
        return reply.code(401).send({
          message: "Invalid Code",
          success: false,
        });
      }

      await prisma.user.update({
        where: { id: user!.userId },
        data: {
          password: await bcrypt.hash(password, 10),
        },
      });

      reply.send({
        success: true,
      });
    }
  );

  // User password login route
  fastify.post(
    "/api/v1/auth/login",
    {
      schema: {
        body: {
          properties: {
            email: { type: "string" },
            password: { type: "string" },
          },
          required: ["email", "password"],
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      let { email, password } = request.body as {
        email: string;
        password: string;
      };

      let user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user?.password) {
        return reply.code(401).send({
          message: "Invalid email or password",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user!.password);

      if (!isPasswordValid) {
        reply.code(401).send({
          message: "Invalid email or password",
        });
        throw new Error("Password is not valid");
      }

      var b64string = process.env.SECRET;
      var buf = new Buffer(b64string!, "base64"); // Ta-da

      let token = jwt.sign(
        {
          data: { id: user!.id },
        },
        buf,
        { expiresIn: "7d" }
      );

      await prisma.session.create({
        data: {
          userId: user!.id,
          sessionToken: token,
          expires: new Date(Date.now() + 60 * 60 * 1000),
        },
      });

      const data = {
        id: user!.id,
        email: user!.email,
        name: user!.name,
        isAdmin: user!.isAdmin,
        language: user!.language,
        ticket_created: user!.notify_ticket_created,
        ticket_status_changed: user!.notify_ticket_status_changed,
        ticket_comments: user!.notify_ticket_comments,
        ticket_assigned: user!.notify_ticket_assigned,
        firstLogin: user!.firstLogin,
        external_user: user!.external_user,
      };

      reply.send({
        token,
        user: data,
      });
    }
  );

  // Checks if a user is password auth or other
  fastify.post(
    "/api/v1/auth/check",
    async (request: FastifyRequest, reply: FastifyReply) => {
      let { email } = request.body as {
        email: string;
      };

      let user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return reply.code(401).send({
          message: "Invalid email",
          success: false,
        });
      }

      if (user?.external_user) {
        return reply.send({
          success: true,
          message: "External user",
          oauth: false,
        });
      }

      const authtype = await prisma.config.findMany({
        where: {
          sso_active: true,
        },
      });

      if (authtype.length === 0) {
        return reply.code(200).send({
          success: true,
          message: "SSO not enabled",
          oauth: false,
        });
      }

      const provider = authtype[0].sso_provider;

      // Find out which config type it is, then action accordinly

      switch (provider) {
        case "oidc":
          const config = await getConfig();
          if (!config) {
            return reply
              .code(500)
              .send({ error: "OIDC configuration not found" });
          }

          const oidcClient = await getOidcClient(config);

          // Generate authorization URL
          const url = oidcClient.authorizationUrl({
            scope: "openid profile email",
          });

          reply.send({
            type: "oidc",
            success: true,
            url: url,
          });

          break;
        case "oauth":
          const oauthProvider = await getOAuthProvider();

          if (!oauthProvider) {
            return reply.code(500).send({
              error: `OAuth provider ${provider} configuration not found`,
            });
          }

          const client = getOAuthClient({
            ...oauthProvider,
            name: oauthProvider.name,
          });

          // Generate authorization URL
          const uri = client.authorizeURL({
            redirect_uri: oauthProvider.redirectUri,
            scope: oauthProvider.scope,
          });

          reply.send({
            type: "oauth",
            success: true,
            url: uri,
          });

          break;
        default:
          break;
      }
    }
  );

  // oidc api callback route
  fastify.get(
    "/api/v1/auth/oidc/callback",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const oidc = getConfig();

        const config = await getOAuthClient(oidc);
        if (!config) {
          return reply
            .code(500)
            .send({ error: "OIDC configuration not properly set" });
        }

        const oidcClient = await getOidcClient(config);

        const params = oidcClient.callbackParams(request.raw);

        const tokenSet = await oidcClient.callback(config.redirectUri, params);
        const userInfo = await oidcClient.userinfo(tokenSet.access_token);

        let user = await prisma.user.findUnique({
          where: { email: userInfo },
        });

        if (!user) {
          return reply.send({
            success: false,
            message: "Invalid email",
          });
        }

        var b64string = process.env.SECRET;
        var secret = new Buffer(b64string!, "base64"); // Ta-da

        // Issue JWT token
        let token = jwt.sign(
          {
            data: { id: user.id },
          },
          secret,
          { expiresIn: "8h" }
        );

        // Create a session
        await prisma.session.create({
          data: {
            userId: user.id,
            sessionToken: token,
            expires: new Date(Date.now() + 8 * 60 * 60 * 1000),
          },
        });

        // Send Response
        reply.send({
          token,
          success: true,
        });
      } catch (error: any) {
        console.error("Authentication error:", error);
        reply.status(403).send({
          success: false,
          error: "OIDC callback error",
          details: error.message,
        });
      }
    }
  );

  // oauth api callback route
  fastify.get(
    "/api/v1/auth/oauth/callback",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { code }: any = request.query;
      const oauthProvider = await getOAuthProvider();

      if (!oauthProvider) {
        return reply.code(500).send({
          error: `OAuth provider configuration not found`,
        });
      }

      const client = new AuthorizationCode({
        client: {
          id: oauthProvider.clientId,
          secret: oauthProvider.clientSecret,
        },
        auth: {
          tokenHost: "https://github.com",
          tokenPath: "/login/oauth/access_token",
        },
      });

      const tokenParams = {
        code,
        redirect_uri: oauthProvider.redirectUri,
      };

      try {
        // Exchange authorization code for an access token
        const fetch_token = await client.getToken(tokenParams);
        const access_token = fetch_token.token.access_token;

        // // Fetch user info from the provider
        const userInfoResponse: any = await axios.get(oauthProvider.userInfoUrl, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        const emails = oauthProvider.name === "github" ? await getUserEmails(access_token as string) : userInfoResponse.email

        // Issue JWT token
        let user = await prisma.user.findUnique({
          where: { email: emails },
        });

        if (!user) {
          return reply.send({
            success: false,
            message: "Invalid email",
          });
        }

        var b64string = process.env.SECRET;
        var secret = new Buffer(b64string!, "base64"); // Ta-da

        // Issue JWT token
        let signed_token = jwt.sign(
          {
            data: { id: user.id },
          },
          secret,
          { expiresIn: "8h" }
        );

        // Create a session
        await prisma.session.create({
          data: {
            userId: user.id,
            sessionToken: signed_token,
            expires: new Date(Date.now() + 8 * 60 * 60 * 1000),
          },
        });

        // Send Response
        reply.send({
          token: signed_token,
          success: true,
        });
      } catch (error: any) {
        console.error("Authentication error:", error);
        reply.status(403).send({
          success: false,
          error: "OAuth callback error",
          details: error.message,
        });
      }
    }
  );

  // saml api callback route

  // Delete a user
  fastify.delete(
    "/api/v1/auth/user/:id",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];
      const token = checkToken(bearer);

      if (token) {
        const { id } = request.params as { id: string };

        await prisma.notes.deleteMany({ where: { userId: id } });
        await prisma.session.deleteMany({ where: { userId: id } });
        await prisma.notifications.deleteMany({ where: { userId: id } });

        await prisma.user.delete({
          where: { id },
        });

        reply.send({ success: true });
      }
    }
  );

  // User Profile
  fastify.get(
    "/api/v1/auth/profile",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];

      const token = checkToken(bearer);

      if (token) {
        let session = await prisma.session.findUnique({
          where: {
            sessionToken: request.headers.authorization!.split(" ")[1],
          },
        });

        let user = await prisma.user.findUnique({
          where: { id: session!.userId },
        });

        if (!user) {
          return reply.code(401).send({
            message: "Invalid user",
          });
        }

        const config = await prisma.config.findFirst();

        const notifcations = await prisma.notifications.findMany({
          where: { userId: user!.id },
          orderBy: {
            createdAt: "desc",
          },
        });

        const data = {
          id: user!.id,
          email: user!.email,
          name: user!.name,
          isAdmin: user!.isAdmin,
          language: user!.language,
          ticket_created: user!.notify_ticket_created,
          ticket_status_changed: user!.notify_ticket_status_changed,
          ticket_comments: user!.notify_ticket_comments,
          ticket_assigned: user!.notify_ticket_assigned,
          sso_status: config!.sso_active,
          version: config!.client_version,
          notifcations,
          external_user: user!.external_user,
        };

        reply.send({
          user: data,
        });
      } else {
        throw new Error("Invalid token");
      }
    }
  );

  // Reset Users password
  fastify.post(
    "/api/v1/auth/reset-password",
    async (request: FastifyRequest, reply: FastifyReply) => {
      let { password } = request.body as {
        password: string;
      };

      const bearer = request.headers.authorization!.split(" ")[1];
      const token = checkToken(bearer);

      if (token) {
        let session = await prisma.session.findUnique({
          where: {
            sessionToken: bearer,
          },
        });

        const hashedPass = await bcrypt.hash(password, 10);

        await prisma.user.update({
          where: { id: session?.userId },
          data: {
            password: hashedPass,
          },
        });

        reply.send({
          success: true,
        });
      } else {
        reply.send({
          success: false,
        });
      }
    }
  );

  // Reset password by admin
  fastify.post(
    "/api/v1/auth/admin/reset-password",
    async (request: FastifyRequest, reply: FastifyReply) => {
      let { password, user } = request.body as {
        password: string;
        user: string;
      };

      console.log(user);

      const bearer = request.headers.authorization!.split(" ")[1];
      const token = checkToken(bearer);

      if (token) {
        let session = await prisma.session.findUnique({
          where: {
            sessionToken: bearer,
          },
        });

        const check = await prisma.user.findUnique({
          where: { id: session?.userId },
        });

        if (check?.isAdmin === false) {
          return reply.code(401).send({
            message: "Unauthorized",
          });
        }

        const hashedPass = await bcrypt.hash(password, 10);

        await prisma.user.update({
          where: { id: user },
          data: {
            password: hashedPass,
          },
        });

        reply.send({
          success: true,
        });
      } else {
        reply.send({
          success: false,
        });
      }
    }
  );

  // Update a users profile/config
  fastify.put(
    "/api/v1/auth/profile",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];

      //checks if token is valid and returns valid token
      const token = checkToken(bearer);

      if (token) {
        let session = await prisma.session.findUnique({
          where: {
            sessionToken: bearer,
          },
        });

        const { name, email, language } = request.body as {
          name: string;
          email: string;
          language: string;
        };

        let user = await prisma.user.update({
          where: { id: session?.userId },
          data: {
            name: name,
            email: email,
            language: language,
          },
        });

        reply.send({
          user,
        });
      } else {
        reply.send({
          sucess: false,
        });
      }
    }
  );

  // Update a users Email notification settings
  fastify.put(
    "/api/v1/auth/profile/notifcations/emails",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];

      //checks if token is valid and returns valid token
      const token = checkToken(bearer);

      if (token) {
        let session = await prisma.session.findUnique({
          where: {
            sessionToken: bearer,
          },
        });

        const {
          notify_ticket_created,
          notify_ticket_assigned,
          notify_ticket_comments,
          notify_ticket_status_changed,
        } = request.body as any;

        let user = await prisma.user.update({
          where: { id: session?.userId },
          data: {
            notify_ticket_created: notify_ticket_created,
            notify_ticket_assigned: notify_ticket_assigned,
            notify_ticket_comments: notify_ticket_comments,
            notify_ticket_status_changed: notify_ticket_status_changed,
          },
        });

        reply.send({
          user,
        });
      } else {
        reply.send({
          sucess: false,
        });
      }
    }
  );

  // Logout a user (deletes session)
  fastify.get(
    "/api/v1/auth/user/:id/logout",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];
      const token = checkToken(bearer);
      if (token) {
        const { id } = request.params as { id: string };

        await prisma.session.deleteMany({
          where: { userId: id },
        });

        reply.send({ success: true });
      }
    }
  );

  // Update a users role
  fastify.put(
    "/api/v1/auth/user/role",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];
      const token = checkToken(bearer);
      if (token) {
        const { id, role } = request.body as { id: string; role: boolean };
        // check for atleast one admin on role downgrade
        if (role === false) {
          const admins = await prisma.user.findMany({
            where: { isAdmin: true },
          });
          if (admins.length === 1) {
            reply.code(400).send({
              message: "Atleast one admin is required",
              success: false,
            });
            return;
          }
        }
        await prisma.user.update({
          where: { id },
          data: {
            isAdmin: role,
          },
        });

        reply.send({ success: true });
      }
    }
  );
}
