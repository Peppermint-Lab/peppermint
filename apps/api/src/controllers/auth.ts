import axios from "axios";
import bcrypt from "bcrypt";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { checkToken } from "../lib/jwt";
import { forgotPassword } from "../lib/nodemailer/auth/forgot-password";
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
      let { email, password, admin, name } = request.body as {
        email: string;
        password: string;
        admin: boolean;
        name: string;
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

      await prisma.user.create({
        data: {
          email,
          password: await bcrypt.hash(password, 10),
          name,
          isAdmin: admin,
        },
      });

      reply.send({
        success: true,
      });
    }
  );

  // Forgot password
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

      await prisma.passwordResetToken.create({
        data: {
          userId: user!.id,
          code: String(code),
        },
      });

      forgotPassword(email, String(code), link);

      reply.send({
        success: true,
      });
    }
  );

  fastify.post(
    "/api/v1/auth/password-reset/code",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { code } = request.body as { code: string };

      const reset = await prisma.passwordResetToken.findUnique({
        where: { code: code },
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

      const authtype = await prisma.config.findMany({
        where: {
          sso_active: true,
        },
      });

      const provider = await prisma.provider.findMany();
      const oauth = provider[0];

      console.log(authtype);

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
        ouath_url: `${url}?client_id=${oauth.clientId}&redirect_uri=${oauth.redirectUri}&state=${email}&login=${email}&scope=user`,
      });
    }
  );

  // SSO api callback route
  fastify.get(
    "/api/v1/auth/sso/login/callback",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { code, state } = request.query as { code: string; state: string };

      const provider = await prisma.provider.findFirst({});

      const data = await axios.post(
        `https://github.com/login/oauth/access_token`,
        {
          client_id: provider?.clientId,
          client_secret: provider?.clientSecret,
          code: code,
          redirect_uri: provider?.redirectUri,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      const access_token = data.data;

      console.log(access_token);

      if (access_token) {
        const gh = await axios.get(`https://api.github.com/user/emails`, {
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `token ${access_token.access_token}`,
          },
        });

        const emails = gh.data;

        const filter = emails.filter((e: any) => e.primary === true);

        let user = await prisma.user.findUnique({
          where: { email: filter[0].email },
        });

        if (!user) {
          reply.send({
            success: false,
            message: "Invalid email",
          });
        }

        var b64string = process.env.SECRET;
        var buf = new Buffer(b64string!, "base64"); // Ta-da

        let token = jwt.sign(
          {
            data: { id: user!.id },
          },
          buf,
          { expiresIn: "8h" }
        );

        await prisma.session.create({
          data: {
            userId: user!.id,
            sessionToken: token,
            expires: new Date(Date.now() + 8 * 60 * 60 * 1000),
          },
        });

        reply.send({
          token,
          success: true,
        });
      } else {
        reply.status(403).send({
          success: false,
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
}
