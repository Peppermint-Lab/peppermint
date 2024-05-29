import axios from "axios";
import bcrypt from "bcrypt";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { track } from "../lib/hog";
import { checkToken } from "../lib/jwt";
import { forgotPassword } from "../lib/nodemailer/auth/forgot-password";
import { checkSession } from "../lib/session";
import { prisma } from "../prisma";

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
            reply.code(401).send({
              message: "Unauthorized",
            });
          }

          // Checks if email already exists
          let record = await prisma.user.findUnique({
            where: { email },
          });

          // if exists, return 400
          if (record) {
            reply.code(400).send({
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
        reply.code(400).send({
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
        reply.code(401).send({
          message: "Invalid email",
          success: false,
        });
      }

      function generateRandomCode() {
        const min = 100000; // Minimum 6-digit number
        const max = 999999; // Maximum 6-digit number
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
        reply.code(401).send({
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

      if (!user) {
        reply.code(401).send({
          message: "Invalid email or password",
        });
      }

      //@ts-expect-error
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

  // Checks if a user is SSO or password
  fastify.post(
    "/api/v1/auth/sso/check",
    async (request: FastifyRequest, reply: FastifyReply) => {
      let { email } = request.body as {
        email: string;
      };

      let user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        reply.code(401).send({
          message: "Invalid email",
          success: false,
        });
      }

      if (user?.external_user) {
        reply.send({
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

      const provider = await prisma.provider.findMany();
      const oauth = provider[0];

      if (authtype.length === 0) {
        reply.code(200).send({
          success: true,
          message: "SSO not enabled",
          oauth: false,
        });
      }

      const url = "https://github.com/login/oauth/authorize";

      reply.send({
        oauth: true,
        success: true,
        ouath_url: `${url}?client_id=${oauth.clientId}&redirect_uri=${oauth.redirectUri}&login=${email}&scope=user`,
      });
    }
  );

  // SSO api callback route
  fastify.get(
    "/api/v1/auth/sso/login/callback",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { code, state } = request.query as { code: string; state: string };

      console.log("HIT");

      try {
        const provider = await prisma.provider.findFirst({});
        if (!provider) throw new Error("Provider not found");

        const { clientId, clientSecret, redirectUri } = provider;

        const { data: github_user } = await axios.post(
          `https://github.com/login/oauth/access_token`,
          {
            client_id: clientId,
            client_secret: clientSecret,
            code: code,
            redirect_uri: redirectUri,
          },
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        console.log(github_user);

        // await new Promise((r) => setTimeout(r, 2000));

        const { data: emails } = await axios.get(
          `https://api.github.com/user/emails`,
          {
            headers: {
              Accept: "application/vnd.github+json",
              Authorization: `Bearer ${github_user.access_token}`,
            },
          }
        );

        console.log(emails);

        const primaryEmail = emails.find((e: any) => e.primary === true)?.email;
        if (!primaryEmail) throw new Error("Primary email not found");

        let user = await prisma.user.findUnique({
          where: { email: primaryEmail },
        });

        if (!user) {
          return reply.send({
            success: false,
            message: "Invalid email",
          });
        }

        var b64string = process.env.SECRET;
        var secret = new Buffer(b64string!, "base64"); // Ta-da

        let token = jwt.sign(
          {
            data: { id: user.id },
          },
          secret,
          { expiresIn: "8h" }
        );

        await prisma.session.create({
          data: {
            userId: user.id,
            sessionToken: token,
            expires: new Date(Date.now() + 8 * 60 * 60 * 1000),
          },
        });

        reply.send({
          token,
          success: true,
        });
      } catch (error: any) {
        console.error("Authentication error:", error);
        reply.status(403).send({
          success: false,
          message: error.message || "Authentication failed",
        });
      }
    }
  );

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
          reply.code(401).send({
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
          reply.code(401).send({
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
							success: false
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
