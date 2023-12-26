import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { checkToken } from "../lib/jwt";
import { checkSession } from "../lib/session";
import { prisma } from "../prisma";

export function notebookRoutes(fastify: FastifyInstance) {
  // Create a new entry
  fastify.post(
    "/api/v1/notebook/note/create",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const { content, title }: any = request.body;

      const bearer = request.headers.authorization!.split(" ")[1];
      const token = checkToken(bearer);

      if (!title) {
        return reply.status(422).send({ error: "Please add a title" });
      } else {
        if (token) {
          const user = await checkSession(bearer);

          const data = await prisma.notes.create({
            data: {
              title,
              note: content,
              userId: user!.id,
            },
          });

          const { id } = data;

          reply.status(200).send({ success: true, id });
        }
      }
    }
  );

  // Get all entries
  fastify.get(
    "/api/v1/notebooks/all",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];
      const token = checkToken(bearer);

      if (token) {
        const user = await checkSession(bearer);

        const notebooks = await prisma.notes.findMany({
          where: { userId: user!.id },
        });

        reply.status(200).send({ success: true, notebooks: notebooks });
      }
    }
  );

  // Get a single entry
  fastify.get(
    "/api/v1/notebooks/note/:id",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];
      const token = checkToken(bearer);

      if (token) {
        const user = await checkSession(bearer);

        const { id }: any = request.params;

        const note = await prisma.notes.findUnique({
          where: { userId: user!.id, id: id },
        });

        reply.status(200).send({ success: true, note });
      }
    }
  );

  // Delete an entry
  fastify.delete(
    "/api/v1/notebooks/note/:id/delete",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id }: any = request.params;

      const bearer = request.headers.authorization!.split(" ")[1];
      const token = checkToken(bearer);

      if (token) {
        await prisma.notes.delete({
          where: { id: id },
        });

        reply.status(200).send({ success: true });
      }
    }
  );

  // Update an entry
  fastify.put(
    "/api/v1/notebooks/note/:id/update",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id }: any = request.params;
      const { content }: any = request.body;

      const bearer = request.headers.authorization!.split(" ")[1];
      const token = checkToken(bearer);

      if (token) {
        await checkSession(bearer);

        await prisma.notes.update({
          where: { id: id },
          data: {
            note: content,
          },
        });

        reply.status(200).send({ success: true });
      }
    }
  );
}
