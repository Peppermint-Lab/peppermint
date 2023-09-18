import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { checkToken } from "../lib/jwt";
import { prisma } from "../prisma";

export function userRoutes(fastify: FastifyInstance) {
  // All users
  fastify.get(
    "/api/v1/users/all",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];

      if (bearer) {
        const token = checkToken(bearer);
        if (token) {
          const users = await prisma.user.findMany({});

          reply.send({
            users,
            success: true,
          });
        }
      } else {
        reply.send({
          success: false,
          message: "No token provided",
        });
      }
    }
  );
}
