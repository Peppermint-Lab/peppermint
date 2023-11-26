import bcrypt from "bcrypt";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { checkToken } from "../lib/jwt";
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

  // User login route
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

      var b64string = "TOMATOSOUP";
      var buf = new Buffer(b64string, "base64"); // Ta-da

      let token = jwt.sign(
        {
          data: { id: user!.id },
        },
        buf,
        { expiresIn: "1d" }
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

  // Delete a user
  fastify.delete(
    "/api/v1/auth/user/:id",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = request.params as { id: string };

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
      // check token
      // see if token exists on session table
      // if not, return 401
      // if yes, return user data

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
            message: "Invalid email or password",
          });
        }

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

      //checks if token is valid and returns valid token
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
          sucess: true,
        });
      } else {
        reply.send({
          sucess: false,
        });
      }
    }
  );

  // Update a users profile/config
  fastify.put(
    "/api/v1/auth/profile",
    async (request: FastifyRequest, reply: FastifyReply) => {
      //
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
}
