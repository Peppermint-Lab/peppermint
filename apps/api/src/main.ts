import cors from "@fastify/cors";
import "dotenv/config";
import Fastify, { FastifyInstance } from "fastify";

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

// register all routes
registerRoutes(server);

server.get("/", async function (request, response) {
  const session = await prisma.session.findMany();
  response.send({ session });
});

const start = async () => {
  try {
    // connect to database
    await prisma.$connect();
    server.log.info("Connected to Prisma");

    const port = process.env.PORT || 5003;

    //@ts-expect-error
    await server.listen({ port: port });
  } catch (err) {
    server.log.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }
};

start();
