import bcrypt from "bcrypt";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { checkToken } from "../lib/jwt";
import { prisma } from "../prisma";

export function userRoutes(fastify: FastifyInstance) {
  // All users
  fastify.get(
    "/api/v1/users/all",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];

      if (bearer) {
        const token = checkToken(bearer);
        if (token) {
          const users = await prisma.user.findMany({
            where: {
              external_user: false,
            },
            select: {
              id: true,
              name: true,
              email: true,
              isAdmin: true,
              createdAt: true,
              updatedAt: true,
              language: true,
            },
          });

          reply.send({
            users,
            success: true,
          });
        }
      } else {
        reply.send({
          success: false,
          message: "No token provided",
        });
      }
    }
  );

  // New user
  fastify.post(
    "/api/v1/user/new",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];

      const { email, password, name, admin }: any = request.body;

      const e = email.toLowerCase();

      if (bearer) {
        const token = checkToken(bearer);
        if (token) {
          const hash = await bcrypt.hash(password, 10);

          await prisma.user.create({
            data: {
              name,
              email: e,
              password: hash,
              isAdmin: admin,
            },
          });

          reply.send({
            success: true,
          });
        }
      } else {
        reply.send({
          success: false,
          message: "No token provided",
        });
      }
    }
  );

  // (ADMIN) Reset password
  fastify.put(
    "/api/v1/user/reset-password",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];

      const { password, id }: any = request.body;

      if (bearer) {
        const token = checkToken(bearer);
        if (token) {
          const hashedPass = await bcrypt.hash(password, 10);
          await prisma.user.update({
            where: { id: id },
            data: {
              password: hashedPass,
            },
          });
          reply
            .status(201)
            .send({ message: "password updated success", failed: false });
        }
      } else {
        reply.send({
          success: false,
          message: "No token provided",
        });
      }
    }
  );

  // Mark Notification as read
  fastify.get(
    "/api/v1/user/notifcation/:id",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];
      const token = checkToken(bearer);

      const { id }: any = request.params;

      if (token) {
        await prisma.notifications.update({
          where: { id: id },
          data: {
            read: true,
          },
        });

        reply.send({
          success: true,
        });
      }
    }
  );
}
