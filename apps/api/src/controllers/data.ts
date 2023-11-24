import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../prisma";

export function dataRoutes(fastify: FastifyInstance) {
  // Get total count of all tickets
  fastify.get(
    "/api/v1/data/tickets/all",

    async (request: FastifyRequest, reply: FastifyReply) => {
      // check jwt is valid
      // check user is admin
    }
  );

  // Get total count of all completed tickets
  fastify.get(
    "/api/v1/data/tickets/completed",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const result = await prisma.ticket.count({
        where: { isComplete: true },
      });

      reply.send({ count: result });
    }
  );

  // Get total count of all open tickets
  fastify.get(
    "/api/v1/data/tickets/open",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const result = await prisma.ticket.count({
        where: { isComplete: false },
      });

      reply.send({ count: result });
    }
  );

  // Get total of all unsassigned tickets
  fastify.get(
    "/api/v1/data/tickets/unassigned",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const result = await prisma.ticket.count({
        where: { userId: null },
      });

      reply.send({ count: result });
    }
  );
}
