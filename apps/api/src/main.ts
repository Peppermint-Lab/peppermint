import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
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

// Ensure the directory exists
const logFilePath = "./logs.log"; // Update this path to a writable location

// Create a writable stream
const logStream = fs.createWriteStream(logFilePath, { flags: "a" });

// Initialize Fastify with logger
const server: FastifyInstance = Fastify({
  logger: {
    stream: logStream, // Use the writable stream
  },
  disableRequestLogging: true,
  trustProxy: true,
});
// CORS configuration
server.register(cors, {
  origin: process.env.CORS_ORIGIN || process.env.NODE_ENV === "development" ? "*" : false,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
});

// Rate limiting configuration
server.register(rateLimit, {
  max: 100, // Max 100 requests
  timeWindow: "1 minute", // Per 1 minute
  cache: 10000, // Cache up to 10000 rate limit checks
  skipSuccessfulRequests: false,
  keyGenerator: function(request) {
    // Use IP + user ID for authenticated requests, just IP for public
    const userId = request.user?.id || 'anonymous';
    return request.ip + ':' + userId;
  },
  errorResponseBuilder: function(request, context) {
    return {
      success: false,
      message: `Too many requests. You hit the rate limit of ${context.max} requests per ${context.after}.`,
      retry: context.ttl
    };
  }
});

server.register(multer.contentParser);

registerRoutes(server);

server.get(
  "/",
  {
    schema: {
      tags: ["health"], // This groups the endpoint under a category
      description: "Health check endpoint",
      response: {
        200: {
          type: "object",
          properties: {
            healthy: { type: "boolean" },
          },
        },
      },
    },
  },
  async function (request, response) {
    response.send({ healthy: true });
  }
);

// JWT authentication hook
server.addHook("preHandler", async function (request: any, reply: any) {
  // Skip authentication for public endpoints
  const publicEndpoints = [
    { url: "/", method: "GET" }, // Health check
    { url: "/api/v1/auth/login", method: "POST" },
    { url: "/api/v1/ticket/public/create", method: "POST" }
  ];

  const isPublicEndpoint = publicEndpoints.some(
    endpoint => request.url === endpoint.url && request.method === endpoint.method
  );

  if (isPublicEndpoint) {
    return true;
  }

  try {
    // Check for Authorization header
    if (!request.headers.authorization) {
      return reply.status(401).send({
        message: "Missing authorization header",
        success: false,
      });
    }

    const authHeader = request.headers.authorization;
    if (!authHeader.startsWith("Bearer ")) {
      return reply.status(401).send({
        message: "Invalid authorization format. Use Bearer token",
        success: false,
      });
    }

    const bearer = authHeader.split(" ")[1];
    if (!bearer) {
      return reply.status(401).send({
        message: "Missing token",
        success: false,
      });
    }

    checkToken(bearer);
  } catch (err) {
    reply.status(401).send({
      message: "Invalid or expired token",
      success: false,
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
});

const start = async () => {
  try {
    // Run prisma generate and migrate commands before starting the server
    await new Promise<void>((resolve, reject) => {
      exec("npx prisma migrate deploy", (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        console.log(stdout);
        console.error(stderr);

        exec("npx prisma generate", (err, stdout, stderr) => {
          if (err) {
            console.error(err);
            reject(err);
          }
          console.log(stdout);
          console.error(stderr);
        });

        exec("npx prisma db seed", (err, stdout, stderr) => {
          if (err) {
            console.error(err);
            reject(err);
          }
          console.log(stdout);
          console.error(stderr);
          resolve();
        });
      });
    });

    // connect to database
    await prisma.$connect();
    server.log.info("Connected to Prisma");

    const port = 5003;

    server.listen(
      { port: Number(port), host: "0.0.0.0" },
      async (err, address) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }

        const client = track();

        client.capture({
          event: "server_started",
          distinctId: "uuid",
        });

        client.shutdownAsync();
        console.info(`Server listening on ${address}`);
      }
    );

    setInterval(() => getEmails(), 10000); // Call getEmails every minute
  } catch (err) {
    server.log.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }
};

start();
