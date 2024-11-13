import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../prisma";

export function dataRoutes(fastify: FastifyInstance) {
  // Get total count of all tickets
  fastify.get(
    "/api/v1/data/tickets/all",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const result = await prisma.ticket.count({
        where: { hidden: false },
      });

      reply.send({ count: result });
    }
  );

  // Get total count of all completed tickets
  fastify.get(
    "/api/v1/data/tickets/completed",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const result = await prisma.ticket.count({
        where: { isComplete: true, hidden: false },
      });

      reply.send({ count: result });
    }
  );

  // Get total count of all open tickets
  fastify.get(
    "/api/v1/data/tickets/open",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const result = await prisma.ticket.count({
        where: { isComplete: false, hidden: false },
      });

      reply.send({ count: result });
    }
  );

  // Get total of all unsassigned tickets
  fastify.get(
    "/api/v1/data/tickets/unassigned",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const result = await prisma.ticket.count({
        where: { userId: null, hidden: false, isComplete: false },
      });

      reply.send({ count: result });
    }
  );

  // Get all logs
  fastify.get(
    "/api/v1/data/logs",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];
      const token = checkToken(bearer);

      if (token) {
        try {
          const logs = await import("fs/promises").then((fs) =>
            fs.readFile("logs.log", "utf-8")
          );
          reply.send({ logs: logs });
        } catch (error) {
          reply.code(500).send({ error: "Failed to read logs file" });
        }
      }
    }
  );
}
