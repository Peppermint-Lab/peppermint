//@ts-nocheck
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import multer from "fastify-multer";
const upload = multer({ dest: "uploads/" });

export function objectStoreRoutes(fastify: FastifyInstance) {
  //
  fastify.post(
    "/api/v1/storage/ticket/:id/upload/single",
    { preHandler: upload.single("file") },

    async (request: FastifyRequest, reply: FastifyReply) => {
      reply.send({
        success: true,
      });
    }
  );

  // Get all ticket attachments

  // Delete an attachment

  // Download an attachment
}
