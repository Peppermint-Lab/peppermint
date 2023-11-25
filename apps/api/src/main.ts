import cors from "@fastify/cors";
import "dotenv/config";
import Fastify, { FastifyInstance } from "fastify";
import { getEmails } from "./lib/imap";

import { exec } from "child_process";
import { PostHog } from "posthog-node";
import { prisma } from "./prisma";
import { registerRoutes } from "./routes";

const server: FastifyInstance = Fastify({
  logger: true,
});

server.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
});

server.register(require("@fastify/swagger"), {
  swagger: {
    info: {
      title: "Peppermint API DOCS",
      description: "Peppermint swagger API",
      version: "0.1.0",
    },
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here",
    },
    host: "localhost",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
      { name: "user", description: "User related end-points" },
      { name: "code", description: "Code related end-points" },
    ],
    definitions: {
      User: {
        type: "object",
        required: ["id", "email"],
        properties: {
          id: { type: "string", format: "uuid" },
          firstName: { type: "string" },
          lastName: { type: "string" },
          email: { type: "string", format: "email" },
        },
      },
    },
    securityDefinitions: {
      apiKey: {
        type: "apiKey",
        name: "apiKey",
        in: "header",
      },
    },
  },
});

// register all routes
registerRoutes(server);

server.get("/", async function (request, response) {
  const session = await prisma.session.findMany();
  response.send({ session });
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

    const port = process.env.PORT || 5003;

    await server.listen(
      { port: Number(port), host: "0.0.0.0" },
      async (err, address) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }

        const client = new PostHog(
          "phc_2gbpy3JPtDC6hHrQy35yMxMci1NY0fD1sttGTcPjwVf",

          { host: "https://app.posthog.com" }
        );

        client.capture({
          event: "server_started",
          distinctId: "uuid",
        });

        await client.shutdownAsync();
        console.info(`Server listening on ${address}`);
      }
    );

    setInterval(() => getEmails(), 60000); // Call getEmails every minute
  } catch (err) {
    server.log.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }
};

start();
