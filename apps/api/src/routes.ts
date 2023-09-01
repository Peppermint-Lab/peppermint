import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { authRoutes } from "./controllers/auth";

export function registerRoutes(fastify: FastifyInstance) {
  authRoutes(fastify);
}
