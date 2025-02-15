import cors from "@fastify/cors";
import "dotenv/config";
import Fastify, { FastifyInstance, FastifyServerOptions } from "fastify";
import multer from "fastify-multer";
import fs from "fs";

import { exec } from "child_process";
import { track } from "./lib/hog";
import { getEmails } from "./lib/imap";
import { checkToken } from "./lib/jwt";
import { prisma } from "./prisma";
import { registerRoutes } from "./routes";

// Initialize Fastify with logger
const server: FastifyInstance = Fastify({
  logger: true,
  trustProxy: true,
} as FastifyServerOptions);

// Configure multer
const upload = multer({ dest: 'uploads/' });

// JWT authentication hook
server.addHook("preHandler", async function (request: any, reply: any) {
  try {
    if (request.url === "/api/v1/auth/login" && request.method === "POST") {
      return true;
    }
    if (
      request.url === "/api/v1/ticket/public/create" &&
      request.method === "POST"
    ) {
      return true;
    }
    const bearer = request.headers.authorization!.split(" ")[1];
    checkToken(bearer);
  } catch (err) {
    reply.status(401).send({
      message: "Unauthorized",
      success: false,
    });
  }
});

const start = async () => {
  try {
    // Register plugins
    await server.register(cors, {
      origin: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Accept",
        "Origin",
        "X-Requested-With",
      ],
      exposedHeaders: ["Content-Disposition"],
      credentials: true,
      maxAge: 86400,
    });

    // Add content type parser for multipart
    server.addContentTypeParser('multipart/form-data', (request, payload, done) => {
      done(null);
    });

    // Register multer
    await server.register(multer.contentParser);

    // Ensure uploads directory exists
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads', { recursive: true });
    }

    // Register routes
    registerRoutes(server);

    // Run prisma commands
    await new Promise<void>((resolve, reject) => {
      exec("npx prisma migrate deploy", (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        console.log(stdout);
        console.error(stderr);
        resolve();
      });
    });

    // connect to database
    await prisma.$connect();
    console.log("Connected to Prisma");

    const port = 5003;
    await server.listen({ port: Number(port), host: "0.0.0.0" });
    console.log(`Server listening on port ${port}`);

    const client = track();
    client.capture({
      event: "server_started",
      distinctId: "uuid",
    });
    await client.shutdownAsync();

    setInterval(() => getEmails(), 10000);
  } catch (err) {
    console.error('Server startup error:', err);
    await prisma.$disconnect();
    process.exit(1);
  }
};

// Make upload available globally
declare module 'fastify' {
  interface FastifyInstance {
    upload: typeof upload;
  }
}

// Decorate fastify with upload
server.decorate('upload', upload);

start();
