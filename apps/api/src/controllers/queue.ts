import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../prisma";

export function emailQueueRoutes(fastify: FastifyInstance) {
  // Create a new email queue
  fastify.get(
    "/api/v1/admin/client/create",

    async (request: FastifyRequest, reply: FastifyReply) => {
      // check jwt is valid
      // check user is admin
    }
  );

  // Get all email queues

  fastify.get(
    "/api/v1/email-queues/all",

    async (request: FastifyRequest, reply: FastifyReply) => {
      // check jwt is valid
      // check user is admin
      const queues = await prisma.emailQueue.findMany({});

      reply.send(queues);
    }
  );

  // Delete an email queue
}
