import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export function dataRoutes(fastify: FastifyInstance) {
  // Get total count of all tickets
  fastify.get(
    "/api/v1/admin/client/create",

    async (request: FastifyRequest, reply: FastifyReply) => {
      // check jwt is valid
      // check user is admin
    }
  );

  // Get total count of all completed tickets

  // Get total count of all open tickets
}
