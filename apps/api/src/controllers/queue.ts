import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

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

  // Delete an email queue
}
