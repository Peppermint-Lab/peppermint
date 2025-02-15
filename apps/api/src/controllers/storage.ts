//@ts-nocheck
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import multer from "fastify-multer";
import fs from "fs";
import { Readable } from "stream";
import { StorageService } from "../lib/services/storage.service";
import { prisma } from "../prisma";

// Configure multer with storage settings
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

export function objectStoreRoutes(fastify: FastifyInstance) {
  // Get storage configuration
  fastify.get(
    "/api/v1/storage/config",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const config = await prisma.storageConfig.findFirst({
          where: { active: true },
        });

        reply.send({
          success: true,
          config,
        });
      } catch (error) {
        console.error("Error fetching storage config:", error);
        reply.status(500).send({
          success: false,
          error: "Failed to fetch storage configuration",
        });
      }
    }
  );

  // Update storage configuration
  fastify.post(
    "/api/v1/storage/config",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        // Deactivate current active config if exists
        await prisma.storageConfig.updateMany({
          where: { active: true },
          data: { active: false },
        });

        // Create new config
        const config = await prisma.storageConfig.create({
          data: request.body,
        });

        // Reset storage provider to use new config
        await StorageService.resetProvider();

        reply.send({
          success: true,
          config,
        });
      } catch (error) {
        console.error("Error updating storage config:", error);
        reply.status(500).send({
          success: false,
          error: "Failed to update storage configuration",
        });
      }
    }
  );

  // Upload a single file
  fastify.post(
    "/api/v1/storage/ticket/:id/upload/single",
    { preHandler: upload.single("file") },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        console.log('Upload request received:', {
          file: request.file,
          body: request.body,
          params: request.params
        });

        if (!request.file) {
          return reply.status(400).send({
            success: false,
            error: "No file uploaded",
          });
        }

        if (!request.params.id) {
          return reply.status(400).send({
            success: false,
            error: "No ticket ID provided",
          });
        }

        if (!request.body.user) {
          return reply.status(400).send({
            success: false,
            error: "No user ID provided",
          });
        }

        // Verify ticket exists
        const ticket = await prisma.ticket.findUnique({
          where: { id: request.params.id }
        });

        if (!ticket) {
          return reply.status(404).send({
            success: false,
            error: "Ticket not found",
          });
        }

        // Verify user exists
        const user = await prisma.user.findUnique({
          where: { id: request.body.user }
        });

        if (!user) {
          return reply.status(404).send({
            success: false,
            error: "User not found",
          });
        }

        console.log('Getting storage provider...');
        const storageProvider = await StorageService.getProvider();
        
        console.log('Uploading file to storage...', {
          path: request.file.path,
          filename: request.file.filename,
          mimetype: request.file.mimetype,
          size: request.file.size
        });

        const filePath = await storageProvider.upload(request.file);
        console.log('File uploaded to storage at path:', filePath);

        console.log('Creating database record...');
        const uploadedFile = await prisma.ticketFile.create({
          data: {
            ticketId: request.params.id,
            filename: request.file.originalname,
            path: filePath,
            mime: request.file.mimetype || 'application/octet-stream',
            size: request.file.size,
            encoding: request.file.encoding || 'utf-8',
            userId: request.body.user,
          },
        });
        console.log('Database record created:', uploadedFile);

        reply.send({
          success: true,
          file: uploadedFile,
        });
      } catch (error) {
        console.error("File upload error details:", {
          error: error.message,
          stack: error.stack,
          file: request.file ? {
            path: request.file.path,
            filename: request.file.filename,
            mimetype: request.file.mimetype,
            size: request.file.size
          } : null,
          ticketId: request.params.id,
          userId: request.body?.user
        });
        
        // Clean up the uploaded file if it exists
        if (request.file && request.file.path) {
          try {
            await fs.promises.unlink(request.file.path);
          } catch (unlinkError) {
            console.error('Failed to clean up uploaded file:', unlinkError);
          }
        }

        reply.status(500).send({
          success: false,
          error: "Failed to upload file",
          details: error.message
        });
      }
    }
  );

  // Get all ticket attachments
  fastify.get(
    "/api/v1/storage/ticket/:id/files",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const files = await prisma.ticketFile.findMany({
          where: {
            ticketId: request.params.id,
          },
        });

        const storageProvider = await StorageService.getProvider();
        const filesWithUrls = await Promise.all(
          files.map(async (file) => ({
            ...file,
            url: await storageProvider.getSignedUrl(file.path),
          }))
        );

        reply.send({
          success: true,
          files: filesWithUrls,
        });
      } catch (error) {
        console.error("Error fetching files:", error);
        reply.status(500).send({
          success: false,
          error: "Failed to fetch files",
        });
      }
    }
  );

  // Delete an attachment
  fastify.delete(
    "/api/v1/storage/ticket/file/:fileId",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const file = await prisma.ticketFile.findUnique({
          where: {
            id: request.params.fileId,
          },
        });

        if (!file) {
          return reply.status(404).send({
            success: false,
            error: "File not found",
          });
        }

        const storageProvider = await StorageService.getProvider();
        await storageProvider.delete(file.path);

        await prisma.ticketFile.delete({
          where: {
            id: file.id,
          },
        });

        reply.send({
          success: true,
        });
      } catch (error) {
        console.error("Error deleting file:", error);
        reply.status(500).send({
          success: false,
          error: "Failed to delete file",
        });
      }
    }
  );

  // Download an attachment
  fastify.get(
    "/api/v1/storage/download/:fileId",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const file = await prisma.ticketFile.findUnique({
          where: {
            id: request.params.fileId,
          },
        });

        if (!file) {
          return reply.status(404).send({
            success: false,
            error: "File not found",
          });
        }

        const storageProvider = await StorageService.getProvider();
        const fileContent = await storageProvider.download(file.path);

        reply.header("Content-Type", file.mime);
        reply.header(
          "Content-Disposition",
          `attachment; filename="${file.filename}"`
        );

        if (fileContent instanceof Readable) {
          return reply.send(fileContent);
        } else if (Buffer.isBuffer(fileContent)) {
          return reply.send(fileContent);
        } else {
          throw new Error("Unsupported file content type");
        }
      } catch (error) {
        console.error("Error downloading file:", error);
        reply.status(500).send({
          success: false,
          error: "Failed to download file",
        });
      }
    }
  );
}
