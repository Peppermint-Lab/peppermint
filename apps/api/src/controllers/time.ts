import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export function timeTrackingRoutes(fastify: FastifyInstance) {
  // Create a new entry
  fastify.get(
    "/api/v1/admin/client/create",

    async (request: FastifyRequest, reply: FastifyReply) => {
      // check jwt is valid
      // check user is admin
    }
  );

  // Get all entries

  // Delete an entry
}
