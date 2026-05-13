import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { track } from "../lib/hog";
import { requirePermission } from "../lib/roles";
import { checkSession } from "../lib/session";
import { prisma } from "../prisma";

async function tracking(event: string, properties: any) {
  const client = track();

  client.capture({
    event: event,
    properties: properties,
    distinctId: "uuid",
  });

  client.shutdownAsync();
}

export function notebookRoutes(fastify: FastifyInstance) {
  // Create a new entry
  fastify.post(
    "/api/v1/notebook/note/create",
    {
      preHandler: requirePermission(["document::create"]),
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { content, title }: any = request.body;
        const user = await checkSession(request);

        if (!user) {
          return reply.code(401).send({ error: "Unauthorized" });
        }

        const data = await prisma.notes.create({
          data: {
            title,
            note: content,
            userId: user.id,
          },
        });

        await tracking("note_created", {});

        const { id } = data;

        reply.status(200).send({ success: true, id });
      } catch (error) {
        reply.code(401).send({ error: "Unauthorized" });
      }
    }
  );

  // Get all entries
  fastify.get(
    "/api/v1/notebooks/all",
    {
      preHandler: requirePermission(["document::read"]),
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const user = await checkSession(request);

        if (!user) {
          return reply.code(401).send({ error: "Unauthorized" });
        }

        const notebooks = await prisma.notes.findMany({
          where: { userId: user.id },
        });

        reply.status(200).send({ success: true, notebooks: notebooks });
      } catch (error) {
        reply.code(401).send({ error: "Unauthorized" });
      }
    }
  );

  // Get a single entry
  fastify.get(
    "/api/v1/notebooks/note/:id",
    {
      preHandler: requirePermission(["document::read"]),
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const user = await checkSession(request);

        if (!user) {
          return reply.code(401).send({ error: "Unauthorized" });
        }

        const { id }: any = request.params;

        const note = await prisma.notes.findUnique({
          where: { userId: user.id, id: id },
        });

        reply.status(200).send({ success: true, note });
      } catch (error) {
        reply.code(401).send({ error: "Unauthorized" });
      }
    }
  );

  // Delete an entry
  fastify.delete(
    "/api/v1/notebooks/note/:id",
    {
      preHandler: requirePermission(["document::delete"]),
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const user = await checkSession(request);

        if (!user) {
          return reply.code(401).send({ error: "Unauthorized" });
        }

        const { id }: any = request.params;

        await prisma.notes.delete({
          where: {
            id: id,
            userId: user.id,
          },
        });

        await tracking("note_deleted", {});

        reply.status(200).send({ success: true });
      } catch (error) {
        reply.code(401).send({ error: "Unauthorized" });
      }
    }
  );

  // Update an entry
  fastify.put(
    "/api/v1/notebooks/note/:id/update",
    {
      preHandler: requirePermission(["document::update"]),
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const user = await checkSession(request);

        if (!user) {
          return reply.code(401).send({ error: "Unauthorized" });
        }

        const { id }: any = request.params;
        const { content, title }: any = request.body;

        await prisma.notes.update({
          where: {
            id: id,
            userId: user.id,
          },
          data: {
            title: title,
            note: content,
          },
        });

        await tracking("note_updated", {});

        reply.status(200).send({ success: true });
      } catch (error) {
        reply.code(401).send({ error: "Unauthorized" });
      }
    }
  );
}
