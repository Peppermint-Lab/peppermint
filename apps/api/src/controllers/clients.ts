import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../prisma";

export function clientRoutes(fastify: FastifyInstance) {
  // Register a new client
  fastify.post(
    "/api/v1/client/create",

    async (request: FastifyRequest, reply: FastifyReply) => {
      // check jwt is valid
      // check user is admin
    }
  );

  // Update client
  fastify.post(
    "/api/v1/client/update",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const { name, email, number, contactName, id }: any = request.body;
      // check jwt is valid
      // check user is admin
    }
  );

  // Get all clients
  fastify.get(
    "/api/v1/clients/all",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const clients = await prisma.client.findMany({});

      reply.send({
        success: true,
        clients: clients,
      });
    }
  );
}
