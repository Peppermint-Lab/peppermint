//@ts-nocheck
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import multer from "fastify-multer";
import { prisma } from "../prisma";
const upload = multer({ dest: "uploads/" });

export function objectStoreRoutes(fastify: FastifyInstance) {
  //
  fastify.post(
    "/api/v1/storage/ticket/:id/upload/single",
    { preHandler: upload.single("file") },

    async (request: FastifyRequest, reply: FastifyReply) => {
      console.log(request.file);
      console.log(request.body);

      const uploadedFile = await prisma.ticketFile.create({
        data: {
          ticketId: request.params.id,
          filename: request.file.originalname,
          path: request.file.path,
          mime: request.file.mimetype,
          size: request.file.size,
          encoding: request.file.encoding,
          userId: request.body.user,
        },
      });

      console.log(uploadedFile);

      reply.send({
        success: true,
      });
    }
  );

  // Get all ticket attachments

  // Delete an attachment

  // Download an attachment
}
