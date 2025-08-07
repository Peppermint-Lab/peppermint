import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { track } from "../lib/hog";
import { requirePermission } from "../lib/roles";
import { prisma } from "../prisma";

export function clientRoutes(fastify: FastifyInstance) {
  // Register a new client
  fastify.post(
    "/api/v1/client/create",
    {
      preHandler: requirePermission(["client::create"]),
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { name, email, number, contactName }: any = request.body;

      const client = await prisma.client.create({
        data: {
          name,
          contactName,
          email,
          number: String(number),
        },
      });

      const hog = track();

      hog.capture({
        event: "client_created",
        distinctId: client.id,
      });

      reply.send({
        success: true,
      });
    }
  );

  // Update client
  fastify.post(
    "/api/v1/client/update",
    {
      preHandler: requirePermission(["client::update"]),
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { name, email, number, contactName, id }: any = request.body;

      await prisma.client.update({
        where: { id: id },
        data: {
          name,
          contactName,
          email,
          number: String(number),
        },
      });

      reply.send({
        success: true,
      });
    }
  );

  // Get all clients
  fastify.get(
    "/api/v1/clients/all",
    {
      preHandler: requirePermission(["client::read"]),
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const clients = await prisma.client.findMany({});

      reply.send({
        success: true,
        clients: clients,
      });
    }
  );

  // Delete client
  fastify.delete(
    "/api/v1/clients/:id/delete-client",
    {
      preHandler: requirePermission(["client::delete"]),
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id }: any = request.params;

      await prisma.client.delete({
        where: { id: id },
      });

      reply.send({
        success: true,
      });
    }
  );
}
