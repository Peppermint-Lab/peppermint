import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../prisma";

export function todoRoutes(fastify: FastifyInstance) {
  // Create a new todo
  fastify.get(
    "/api/v1/todos/create",

    async (request: FastifyRequest, reply: FastifyReply) => {
      // check jwt is valid
      // check user is admin
    }
  );

  // Get all todos

  fastify.get(
    "/api/v1/todos/all",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const todos = await prisma.todos.findMany({});

      reply.send(todos);
    }
  );

  // Delete a todo
}
