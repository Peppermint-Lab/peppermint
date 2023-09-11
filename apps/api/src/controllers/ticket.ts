import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export function ticketRoutes(fastify: FastifyInstance) {
  // Create a new ticket
  fastify.get(
    "/api/v1/admin/client/create",

    async (request: FastifyRequest, reply: FastifyReply) => {
      // check jwt is valid
      // check user is admin
    }
  );

  // Get all tickets

  // Get all tickets for a user

  // Get all opened tickets

  // Get all closed tickets

  // Get all unassigned tickets

  // export all tickets

  // import all tickets

  // Delete a ticket (soft delete by admin only)
}
