import bcrypt from "bcrypt";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { track } from "../lib/hog";
import { requirePermission } from "../lib/roles";
import { checkSession } from "../lib/session";
import { prisma } from "../prisma";

export function userRoutes(fastify: FastifyInstance) {
  // All users
  fastify.get(
    "/api/v1/users/all",
    {
      preHandler: requirePermission(["user::read"]),
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
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
  );

  // New user
  fastify.post(
    "/api/v1/user/new",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const session = await checkSession(request);

      if (session!.isAdmin) {
        const { email, password, name, admin }: any = request.body;

        const e = email.toLowerCase();

        const hash = await bcrypt.hash(password, 10);

        await prisma.user.create({
          data: {
            name,
            email: e,
            password: hash,
            isAdmin: admin,
          },
        });

        const client = track();

        client.capture({
          event: "user_created",
          distinctId: "uuid",
        });

        client.shutdownAsync();

        reply.send({
          success: true,
        });
      } else {
        reply.status(403).send({ message: "Unauthorized", failed: true });
      }
    }
  );

  // (ADMIN) Reset password
  fastify.put(
    "/api/v1/user/reset-password",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { password, id }: any = request.body;

      const session = await checkSession(request);

      if (session!.isAdmin) {
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
      } else {
        reply.status(403).send({ message: "Unauthorized", failed: true });
      }
    }
  );

  // Mark Notification as read
  fastify.get(
    "/api/v1/user/notifcation/:id",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id }: any = request.params;
      const session = await checkSession(request);
      
      if (!session) {
        return reply.code(401).send({
          message: "Unauthorized",
          success: false,
        });
      }

      // Get the notification and verify it belongs to the user
      const notification = await prisma.notifications.findUnique({
        where: { id: id }
      });
      
      if (!notification) {
        return reply.code(404).send({
          message: "Notification not found",
          success: false,
        });
      }
      
      if (notification.userId !== session.id) {
        return reply.code(403).send({
          message: "Access denied. You can only manage your own notifications.",
          success: false,
        });
      }

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
  );
}
