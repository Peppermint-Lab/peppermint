import { FastifyInstance } from "fastify";
import { track } from "../lib/hog";
import { Hook, prisma } from "../prisma";

// Type definitions
interface WebhookPayload {
  name: string;
  url: string;
  type: Hook;
  active: boolean;
  secret: string;
}

export function webhookRoutes(fastify: FastifyInstance) {
  // Create a new webhook
  fastify.post<{ Body: WebhookPayload }>(
    "/api/v1/webhook/create",
    async (request, reply) => {
      try {
        const { name, url, type, active, secret } = request.body;

        const webhook = await prisma.webhooks.create({
          data: {
            name,
            url,
            type,
            active,
            secret,
            createdBy: "375f7799-5485-40ff-ba8f-0a28e0855ecf", // TODO: Get from authenticated user
          },
        });

        const client = track();
        await client.capture({
          event: "webhook_created",
          distinctId: webhook.id, // Use actual webhook ID
        });
        await client.shutdownAsync();

        return reply.status(201).send({
          data: webhook,
          success: true,
        });
      } catch (error) {
        return reply.status(400).send({
          error:
            error instanceof Error ? error.message : "Failed to create webhook",
          success: false,
        });
      }
    }
  );

  // Get all webhooks
  fastify.get("/api/v1/webhooks/all", async (request, reply) => {
    try {
      const webhooks = await prisma.webhooks.findMany();

      return reply.status(200).send({
        data: webhooks,
        success: true,
      });
    } catch (error) {
      return reply.status(400).send({
        error:
          error instanceof Error ? error.message : "Failed to fetch webhooks",
        success: false,
      });
    }
  });

  // Delete a webhook
  fastify.delete<{ Params: { id: string } }>(
    "/api/v1/admin/webhook/:id/delete",
    async (request, reply) => {
      try {
        const { id } = request.params;

        await prisma.webhooks.delete({
          where: { id },
        });

        return reply.status(200).send({
          success: true,
        });
      } catch (error) {
        return reply.status(400).send({
          error:
            error instanceof Error ? error.message : "Failed to delete webhook",
          success: false,
        });
      }
    }
  );
}
