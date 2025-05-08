import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

export async function performanceLogger(fastify: FastifyInstance) {
  fastify.addHook('onRequest', async (request: FastifyRequest, reply: FastifyReply) => {
    request.meta = { startTime: process.hrtime() };
  });

  fastify.addHook('onResponse', async (request: FastifyRequest, reply: FastifyReply) => {
    if (request.meta && request.meta.startTime) {
      const diff = process.hrtime(request.meta.startTime);
      const elapsed = diff[0] * 1e3 + diff[1] / 1e6; // Convert to milliseconds
      fastify.log.info(`Request to ${request.raw.url} took ${elapsed.toFixed(2)}ms`);
    }
  });
}
