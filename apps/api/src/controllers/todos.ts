import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { checkToken } from "../lib/jwt";
import { checkSession } from "../lib/session";
import { prisma } from "../prisma";

const doesTodoExist = async (id: any) => {
  const exists = await prisma.todos
    .findUnique({
      where: {
        id: id,
      },
    })
    .then(Boolean);

  return exists;
};

export function todoRoutes(fastify: FastifyInstance) {
  // Create a new todo
  fastify.post(
    "/api/v1/todo/create",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const { todo } = request.body as { todo: string };

      const bearer = request.headers.authorization!.split(" ")[1];
      const token = checkToken(bearer);

      if (!todo) {
        console.log("No text found!");
        reply.status(400).send({ success: false, message: "No text found!" });
      } else {
        if (token) {
          const user = await checkSession(bearer);

          if (user) {
            await prisma.todos.create({
              data: {
                text: todo,
                userId: user!.id,
              },
            });
            reply.send({ success: true, message: "Todo created!" });
          } else {
            reply
              .status(400)
              .send({ success: false, message: "User not found!" });
          }
        }
      }
    }
  );

  // Get all todos

  fastify.get(
    "/api/v1/todos/all",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];
      const token = checkToken(bearer);

      if (token) {
        const todos = await prisma.todos.findMany({});

        reply.send({
          todos: todos,
        });
      }
    }
  );

  // Delete a todo
  fastify.delete(
    "/api/v1/todo/:id/delete",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];
      const token = checkToken(bearer);

      if (token) {
        const { id } = request.params as { id: string };

        const todo = await doesTodoExist(id);

        if (!todo) {
          return reply.status(404).send({
            success: false,
            error: "Todo not found.",
          });
        }

        await prisma.todos.delete({
          where: {
            id: id,
          },
        });

        reply.status(201).send({ success: true, message: "Todo deleted" });
      }
    }
  );
}
