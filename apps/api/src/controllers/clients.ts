import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export function clientRoutes(fastify: FastifyInstance) {
  // Register a new client
  fastify.post(
    "/api/v1/admin/client/create",

    async (request: FastifyRequest, reply: FastifyReply) => {
      // check jwt is valid
      // check user is admin
    }
  );

  // Update client

  // Get all clients

  // Update client Notes
}
