import { FastifyInstance } from "fastify";
import { authRoutes } from "./controllers/auth";
import { clientRoutes } from "./controllers/clients";
import { configRoutes } from "./controllers/config";
import { dataRoutes } from "./controllers/data";
import { notebookRoutes } from "./controllers/notebook";
import { emailQueueRoutes } from "./controllers/queue";
import { objectStoreRoutes } from "./controllers/storage";
import { ticketRoutes } from "./controllers/ticket";
import { timeTrackingRoutes } from "./controllers/time";
import { todoRoutes } from "./controllers/todos";
import { userRoutes } from "./controllers/users";
import { webhookRoutes } from "./controllers/webhooks";

export function registerRoutes(fastify: FastifyInstance) {
  authRoutes(fastify);
  emailQueueRoutes(fastify);
  todoRoutes(fastify);
  dataRoutes(fastify);
  ticketRoutes(fastify);
  userRoutes(fastify);
  notebookRoutes(fastify);
  clientRoutes(fastify);
  webhookRoutes(fastify);
  configRoutes(fastify);
  timeTrackingRoutes(fastify);
  objectStoreRoutes(fastify);
}
