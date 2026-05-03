//@ts-nocheck
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import multer from "fastify-multer";
import { prisma } from "../prisma";
import fs from "fs";
import path from "path";

const upload = multer({ dest: "uploads/" });

export function objectStoreRoutes(fastify: FastifyInstance) {
  // Upload a single file to a ticket
  fastify.post(
    "/api/v1/storage/ticket/:id/upload/single",
    { preHandler: upload.single("file") },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = request.params as { id: string };
      const file = (request as any).file;

      if (!file) {
        return reply.status(400).send({ success: false, message: "No file provided" });
      }

      const userId = (request.body as any)?.user ?? "";

      const uploadedFile = await prisma.ticketFile.create({
        data: {
          ticketId: id,
          filename: file.originalname,
          path: file.path,
          mime: file.mimetype,
          size: file.size,
          encoding: file.encoding,
          userId,
        },
      });

      reply.send({ success: true, file: uploadedFile });
    }
  );

  // Serve uploaded files
  fastify.get(
    "/api/v1/storage/ticket/:id/file/:fileId",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { fileId } = request.params as { id: string; fileId: string };

      const file = await prisma.ticketFile.findUnique({
        where: { id: fileId },
      });

      if (!file) {
        return reply.status(404).send({ success: false, message: "File not found" });
      }

      if (!fs.existsSync(file.path)) {
        return reply.status(404).send({ success: false, message: "File not found on disk" });
      }

      reply.type(file.mime);
      reply.send(fs.createReadStream(file.path));
    }
  );
}
