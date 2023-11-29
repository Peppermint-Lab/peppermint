import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { checkToken } from "../lib/jwt";
import { prisma } from "../prisma";

export function emailQueueRoutes(fastify: FastifyInstance) {
  // Create a new email queue
  fastify.post(
    "/api/v1/email-queue/create",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];
      const token = checkToken(bearer);

      if (token) {
        const { name, username, password, hostname, tls }: any = request.body;

        await prisma.emailQueue.create({
          data: {
            name,
            username,
            password,
            hostname,
            tls,
          },
        });

        reply.send({
          success: true,
        });
      }
    }
  );

  // Get all email queues

  fastify.get(
    "/api/v1/email-queues/all",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];
      const token = checkToken(bearer);

      if (token) {
        const queues = await prisma.emailQueue.findMany({});

        reply.send({
          success: true,
          queues: queues,
        });
      }
    }
  );

  // Delete an email queue
  fastify.delete(
    "/api/v1/email-queue/delete",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];
      const token = checkToken(bearer);

      if (token) {
        const { id }: any = request.body;

        await prisma.emailQueue.delete({
          where: {
            id: id,
          },
        });

        reply.send({
          success: true,
        });
      }
    }
  );
}
