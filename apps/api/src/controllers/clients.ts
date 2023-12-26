import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { track } from "../lib/hog";
import { checkToken } from "../lib/jwt";
import { prisma } from "../prisma";

export function clientRoutes(fastify: FastifyInstance) {
  // Register a new client
  fastify.post(
    "/api/v1/client/create",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];
      const token = checkToken(bearer);

      if (token) {
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
    }
  );

  // Update client
  fastify.post(
    "/api/v1/client/update",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];
      const token = checkToken(bearer);

      if (token) {
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
    }
  );

  // Get all clients
  fastify.get(
    "/api/v1/clients/all",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];
      const token = checkToken(bearer);

      if (token) {
        const clients = await prisma.client.findMany({});

        reply.send({
          success: true,
          clients: clients,
        });
      }
    }
  );

  // Delete client
  fastify.delete(
    "/api/v1/clients/:id/delete-client",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];
      const token = checkToken(bearer);

      if (token) {
        const { id }: any = request.params;

        await prisma.client.delete({
          where: { id: id },
        });

        reply.send({
          success: true,
        });
      }
    }
  );
}
