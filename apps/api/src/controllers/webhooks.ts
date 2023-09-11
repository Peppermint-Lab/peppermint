import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export function webhookRoutes(fastify: FastifyInstance) {
  // Create a new webhook
  fastify.get(
    "/api/v1/admin/client/create",

    async (request: FastifyRequest, reply: FastifyReply) => {
      // check jwt is valid
      // check user is admin
    }
  );

  // Get all webhooks

  // Delete a webhook
}
