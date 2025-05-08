import cors from "@fastify/cors";
import "dotenv/config";
import Fastify, { FastifyInstance } from "fastify";
import multer from "fastify-multer";
import fs from "fs";
import { exec } from "child_process";
import { track } from "./lib/hog";
import { getEmails } from "./lib/imap";
import { checkToken } from "./lib/jwt";
import { prisma } from "./prisma";
import { registerRoutes } from "./routes";

// === NEW: Import the Fastify rate‑limit plugin ===
import fastifyRateLimit from "@fastify/rate-limit";

const logFilePath = "./logs.log"; // Ensure this path is writable
const logStream   = fs.createWriteStream(logFilePath, { flags: "a" });

const server: FastifyInstance = Fastify({
  logger: { stream: logStream },
  disableRequestLogging: true,
  trustProxy: true,
});

// Core middleware
server.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
});
server.register(multer.contentParser);

// === NEW: Register rate‑limit BEFORE your routes ===
await server.register(fastifyRateLimit, {
  max: 100,                // limit each IP to 100 requests...
  timeWindow: "15 minutes",// ...per 15‑minute window
  errorResponseBuilder: (_request, context) => ({
    statusCode: 429,
    error:      "Too Many Requests",
    message:    `Rate limit exceeded, retry in ${context.after}`,
  }),
});

registerRoutes(server);

server.get(
  "/",
  {
    schema: {
      tags: ["health"],
      description: "Health check endpoint",
      response: {
        200: {
          type: "object",
          properties: { healthy: { type: "boolean" } },
        },
      },
    },
  },
  async (_request, reply) => {
    reply.send({ healthy: true });
  }
);

// JWT authentication hook
server.addHook("preHandler", async (request: any, reply: any) => {
  try {
    if (
      (request.url === "/api/v1/auth/login" && request.method === "POST") ||
      (request.url === "/api/v1/ticket/public/create" && request.method === "POST")
    ) {
      return;
    }
    const bearer = request.headers.authorization!.split(" ")[1];
    checkToken(bearer);
  } catch (err) {
    reply.status(401).send({ message: "Unauthorized", success: false });
  }
});

const start = async () => {
  try {
    // Run Prisma migrations and seeds
    await new Promise<void>((resolve, reject) => {
      exec("npx prisma migrate deploy", (err) => {
        if (err) return reject(err);
        exec("npx prisma generate", (err) => {
          if (err) return reject(err);
          exec("npx prisma db seed", (err) => {
            if (err) return reject(err);
            resolve();
          });
        });
      });
    });

    await prisma.$connect();
    server.log.info("Connected to Prisma");

    const port = 5003;
    server.listen({ port, host: "0.0.0.0" }, (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      const client = track();
      client.capture({ event: "server_started", distinctId: "uuid" });
      client.shutdownAsync();
      console.info(`Server listening on ${address}`);
    });

    setInterval(() => getEmails(), 10000);
  } catch (err) {
    server.log.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }
};

start();
