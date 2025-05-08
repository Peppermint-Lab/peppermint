import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { requirePermission } from "../lib/roles";
import { prisma } from "../prisma";

const BATCH_SIZE = 100; // Define batch size for processing

// Utility function for batched counting
async function batchCount(model: any, where: any): Promise<number> {
  let totalCount = 0;
  let offset = 0;

  while (true) {
    const batchCount = await model.count({
      where,
      take: BATCH_SIZE,
      skip: offset,
    });

    totalCount += batchCount;

    if (batchCount < BATCH_SIZE) {
      break;
    }

    offset += BATCH_SIZE;
  }

  return totalCount;
}

// Utility function for reading logs in chunks
async function readLogsInBatches(filePath: string, batchSize: number): Promise<string[]> {
  const fs = await import("fs/promises");
  const logs = await fs.readFile(filePath, "utf-8");
  const logLines = logs.split("\n");

  const batchedLogs: string[] = [];
  for (let i = 0; i < logLines.length; i += batchSize) {
    const batch = logLines.slice(i, i + batchSize).join("\n");
    batchedLogs.push(batch);
  }

  return batchedLogs;
}

export function dataRoutes(fastify: FastifyInstance) {
  // Get total count of all tickets
  fastify.get(
      "/api/v1/data/tickets/all",
      {
        preHandler: requirePermission(["issue::read"]),
      },
      async (request: FastifyRequest, reply: FastifyReply) => {
        const count = await batchCount(prisma.ticket, { hidden: false });
        reply.send({ count });
      }
  );

  // Get total count of all completed tickets
  fastify.get(
      "/api/v1/data/tickets/completed",
      {
        preHandler: requirePermission(["issue::read"]),
      },
      async (request: FastifyRequest, reply: FastifyReply) => {
        const count = await batchCount(prisma.ticket, { isComplete: true, hidden: false });
        reply.send({ count });
      }
  );

  // Get total count of all open tickets
  fastify.get(
      "/api/v1/data/tickets/open",
      {
        preHandler: requirePermission(["issue::read"]),
      },
      async (request: FastifyRequest, reply: FastifyReply) => {
        const count = await batchCount(prisma.ticket, { isComplete: false, hidden: false });
        reply.send({ count });
      }
  );

  // Get total of all unassigned tickets
  fastify.get(
      "/api/v1/data/tickets/unassigned",
      {
        preHandler: requirePermission(["issue::read"]),
      },
      async (request: FastifyRequest, reply: FastifyReply) => {
        const count = await batchCount(prisma.ticket, {
          userId: null,
          hidden: false,
          isComplete: false,
        });
        reply.send({ count });
      }
  );

  // Get all logs
  fastify.get(
      "/api/v1/data/logs",
      async (request: FastifyRequest, reply: FastifyReply) => {
        const batchedLogs = await readLogsInBatches("logs.log", 100); // Reading logs in batches of 100 lines
        reply.send({ logs: batchedLogs });
      }
  );
}
