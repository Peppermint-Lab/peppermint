import { randomBytes } from "crypto";
import "dotenv/config";
import Fastify from "fastify";
// import cors from "fastify-cors";
import { prisma } from "./prisma";
import { registerRoutes } from "./routes";

const main = async () => {
  const server = Fastify({
    genReqId: () => randomBytes(8).toString("hex"),
    logger: true,
  });

  server.register( {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  });

  // connect to database
  await prisma.$connect();
  server.log.info("Connected to Prisma");

  // register all routes
  registerRoutes(server);

  try {
    await server.listen(process.env.PORT || 5002, "0.0.0.0");
  } catch (err) {
    server.log.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }
};
main();
