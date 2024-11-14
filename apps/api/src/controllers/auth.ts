import axios from "axios";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { LRUCache } from "lru-cache";
import { generators } from "openid-client";
import { AuthorizationCode } from "simple-oauth2";
import { getOAuthProvider, getOidcConfig } from "../lib/auth";
import { track } from "../lib/hog";
import { forgotPassword } from "../lib/nodemailer/auth/forgot-password";
import { requirePermission } from "../lib/roles";
import { checkSession } from "../lib/session";
import { getOAuthClient } from "../lib/utils/oauth_client";
import { getOidcClient } from "../lib/utils/oidc_client";
import { prisma } from "../prisma";

const options = {
  max: 500, // Maximum number of items in cache
  ttl: 1000 * 60 * 5, // Items expire after 5 minutes
};

const cache = new LRUCache(options);

async function getUserEmails(token: string) {
  const res = await axios.get("https://api.github.com/user/emails", {
    headers: {
      Authorization: `token ${token}`,
    },
  });

  // Return only the primary email address
  const primaryEmail = res.data.find(
    (email: { primary: boolean }) => email.primary
  );
  return primaryEmail ? primaryEmail.email : null; // Return the email or null if not found
}

function generateRandomPassword(length: number): string {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

async function tracking(event: string, properties: any) {
  const client = track();

  client.capture({
    event: event,
    properties: properties,
    distinctId: "uuid",
  });
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
      let { email, password, admin, name } = request.body as {
        email: string;
        password: string;
        admin: boolean;
        name: string;
      };

      const requester = await checkSession(request);

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
        event: "user_registered_external",
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

      // Generate a secure session token
      var secret = Buffer.from(process.env.SECRET!, "base64");
      const token = jwt.sign(
        {
          data: {
            id: user!.id,
            // Add a unique identifier for this session
            sessionId: crypto.randomBytes(32).toString("hex"),
          },
        },
        secret,
        {
          expiresIn: "8h",
          algorithm: "HS256",
        }
      );

      // Store session with additional security info
      await prisma.session.create({
        data: {
          userId: user!.id,
          sessionToken: token,
          expires: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours
          userAgent: request.headers["user-agent"] || "",
          ipAddress: request.ip,
        },
      });

      await tracking("user_logged_in_password", {});

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
  fastify.get(
    "/api/v1/auth/check",
    async (request: FastifyRequest, reply: FastifyReply) => {
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
      const sso_active = authtype[0].sso_active;

      if (!sso_active) {
        return reply.code(200).send({
          success: true,
          message: "SSO not enabled",
          oauth: false,
        });
      }

      // Find out which config type it is, then action accordinly
      switch (provider) {
        case "oidc":
          const config = await getOidcConfig();
          if (!config) {
            return reply
              .code(500)
              .send({ error: "OIDC configuration not found" });
          }

          const oidcClient = await getOidcClient(config);

          // Generate codeVerifier and codeChallenge
          const codeVerifier = generators.codeVerifier();
          const codeChallenge = generators.codeChallenge(codeVerifier);

          // Generate a random state parameter
          const state = generators.state();

          // Store codeVerifier in cache with s
          cache.set(state, {
            codeVerifier: codeVerifier,
          });

          // Generate authorization URL
          const url = oidcClient.authorizationUrl({
            scope: "openid email profile",
            response_type: "code",
            redirect_uri: config.redirectUri,
            code_challenge: codeChallenge,
            code_challenge_method: "S256", // Use 'plain' if 'S256' is not supported
            state: state,
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
        const oidc = await getOidcConfig();

        const config = await getOidcClient(oidc);
        if (!config) {
          return reply
            .code(500)
            .send({ error: "OIDC configuration not properly set" });
        }

        const oidcClient = await getOidcClient(config);

        // Parse the callback parameters
        const params = oidcClient.callbackParams(request.raw);

        if (params.iss === "undefined") {
          // Remove the trailing part and ensure a trailing slash
          params.iss = oidc.issuer.replace(
            /\/\.well-known\/openid-configuration$/,
            "/"
          );
        }

        // Retrieve the state parameter from the callback
        const state = params.state;

        const sessionData: any = cache.get(state);

        if (!sessionData) {
          return reply.status(400).send("Invalid or expired session");
        }

        const { codeVerifier } = sessionData;

        // Handle the case where codeVerifier is not found
        if (!codeVerifier) {
          return reply.status(400).send("Invalid or expired session");
        }

        let tokens = await oidcClient.callback(
          (
            await oidc
          ).redirectUri,
          params,
          {
            code_verifier: codeVerifier,
            state: state,
          }
        );

        // Clean up: Remove the codeVerifier from the cache
        cache.delete(state);

        // Retrieve user information
        const userInfo = await oidcClient.userinfo(tokens.access_token);

        let user = await prisma.user.findUnique({
          where: { email: userInfo.email },
        });

        await tracking("user_logged_in_oidc", {});

        if (!user) {
          // Create a new basic user
          user = await prisma.user.create({
            data: {
              email: userInfo.email,
              password: await bcrypt.hash(generateRandomPassword(12), 10), // Set a random password of length 12
              name: userInfo.name || "New User", // Use the name from userInfo or a default
              isAdmin: false, // Set isAdmin to false for basic users
              language: "en", // Set a default language
              external_user: false, // Mark as external user
              firstLogin: true, // Set firstLogin to true
            },
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
          onboarding: user.firstLogin,
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
          tokenHost: oauthProvider.authorizationUrl,
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
        const userInfoResponse: any = await axios.get(
          oauthProvider.userInfoUrl,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        const emails =
          oauthProvider.name === "github"
            ? await getUserEmails(access_token as string)
            : userInfoResponse.email;

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

        await tracking("user_logged_in_oauth", {});

        // Send Response
        reply.send({
          token: signed_token,
          onboarding: user.firstLogin,
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

  // Delete a user
  fastify.delete(
    "/api/v1/auth/user/:id",
    {
      preHandler: requirePermission(["user::delete"]),
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = request.params as { id: string };

      await prisma.notes.deleteMany({ where: { userId: id } });
      await prisma.session.deleteMany({ where: { userId: id } });
      await prisma.notifications.deleteMany({ where: { userId: id } });

      await prisma.user.delete({
        where: { id },
      });

      reply.send({ success: true });
    }
  );

  // User Profile
  fastify.get(
    "/api/v1/auth/profile",
    async (request: FastifyRequest, reply: FastifyReply) => {
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

      await tracking("user_profile", {});

      reply.send({
        user: data,
      });
    }
  );

  // Reset Users password
  fastify.post(
    "/api/v1/auth/reset-password",
    async (request: FastifyRequest, reply: FastifyReply) => {
      let { password } = request.body as {
        password: string;
      };

      const session = await checkSession(request);

      const hashedPass = await bcrypt.hash(password, 10);

      await prisma.user.update({
        where: { id: session?.id },
        data: {
          password: hashedPass,
        },
      });

      reply.send({
        success: true,
      });
    }
  );

  // Reset password by admin
  fastify.post(
    "/api/v1/auth/admin/reset-password",
    {
      preHandler: requirePermission(["user::manage"]),
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      let { password, user } = request.body as {
        password: string;
        user: string;
      };

      const bearer = request.headers.authorization!.split(" ")[1];
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
    }
  );

  // Update a users profile/config
  fastify.put(
    "/api/v1/auth/profile",
    {
      preHandler: requirePermission(["user::update"]),
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const session = await checkSession(request);

      const { name, email, language } = request.body as {
        name: string;
        email: string;
        language: string;
      };

      let user = await prisma.user.update({
        where: { id: session?.id },
        data: {
          name: name,
          email: email,
          language: language,
        },
      });

      reply.send({
        user,
      });
    }
  );

  // Update a users Email notification settings
  fastify.put(
    "/api/v1/auth/profile/notifcations/emails",
    {
      preHandler: requirePermission(["user::update"]),
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const session = await checkSession(request);

      const {
        notify_ticket_created,
        notify_ticket_assigned,
        notify_ticket_comments,
        notify_ticket_status_changed,
      } = request.body as any;

      let user = await prisma.user.update({
        where: { id: session?.id },
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
    }
  );

  // Logout a user (deletes session)
  fastify.get(
    "/api/v1/auth/user/:id/logout",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = request.params as { id: string };

      await prisma.session.deleteMany({
        where: { userId: id },
      });

      reply.send({ success: true });
    }
  );

  // Update a users role
  fastify.put(
    "/api/v1/auth/user/role",
    {
      preHandler: requirePermission(["user::manage"]),
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const session = await checkSession(request);

      if (session?.isAdmin) {
        const { id, role } = request.body as { id: string; role: boolean };
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
      } else {
        reply.code(401).send({
          message: "Unauthorized",
          success: false,
        });
      }
    }
  );

  // first login
  fastify.post(
    "/api/v1/auth/user/:id/first-login",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = request.params as { id: string };

      await prisma.user.update({
        where: { id },
        data: {
          firstLogin: false,
        },
      });

      await tracking("user_first_login", {});

      reply.send({ success: true });
    }
  );

  // Add a new endpoint to list and manage active sessions
  fastify.get(
    "/api/v1/auth/sessions",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const currentUser = await checkSession(request);
      if (!currentUser) {
        return reply.code(401).send({ message: "Unauthorized" });
      }

      const sessions = await prisma.session.findMany({
        where: { userId: currentUser.id },
        select: {
          id: true,
          userAgent: true,
          ipAddress: true,
          createdAt: true,
          expires: true,
        },
      });

      reply.send({ sessions });
    }
  );

  // Add ability to revoke specific sessions
  fastify.delete(
    "/api/v1/auth/sessions/:sessionId",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const currentUser = await checkSession(request);
      if (!currentUser) {
        return reply.code(401).send({ message: "Unauthorized" });
      }

      const { sessionId } = request.params as { sessionId: string };

      // Only allow users to delete their own sessions
      const session = await prisma.session.findFirst({
        where: {
          id: sessionId,
          userId: currentUser.id,
        },
      });

      if (!session) {
        return reply.code(404).send({ message: "Session not found" });
      }

      await prisma.session.delete({
        where: { id: sessionId },
      });

      reply.send({ success: true });
    }
  );
}
