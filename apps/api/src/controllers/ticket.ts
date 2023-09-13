import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { checkToken } from "../lib/jwt";
import { checkSession } from "../lib/session";
import { prisma } from "../prisma";

export function ticketRoutes(fastify: FastifyInstance) {
  // Create a new ticket
  fastify.get(
    "/api/v1/tickets/create",

    async (request: FastifyRequest, reply: FastifyReply) => {
      // check jwt is valid
      // check user is admin
    }
  );

  // Get all tickets
  fastify.get(
    "/api/v1/tickets/open",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];
      const token = checkToken(bearer);

      if (token) {
        const tickets = await prisma.ticket.findMany({
          where: { isComplete: false },
          include: {
            client: {
              select: { id: true, name: true, number: true },
            },
            assignedTo: {
              select: { id: true, name: true },
            },
            team: {
              select: { id: true, name: true },
            },
          },
        });

        reply.send({
          tickets: tickets,
          sucess: true,
        });
      }
    }
  );

  // Get all open tickets for a user
  fastify.get(
    "/api/v1/tickets/user/open",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];
      const token = checkToken(bearer);

      if (token) {
        const user = await checkSession(bearer);

        const tickets = await prisma.ticket.findMany({
          where: { isComplete: false, userId: user!.id },
          include: {
            client: {
              select: { id: true, name: true, number: true },
            },
            assignedTo: {
              select: { id: true, name: true },
            },
            team: {
              select: { id: true, name: true },
            },
          },
        });

        reply.send({
          tickets: tickets,
          sucess: true,
        });
      }
    }
  );

  // Get all closed tickets
  fastify.get(
    "/api/v1/tickets/completed",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];
      const token = checkToken(bearer);

      if (token) {
        const tickets = await prisma.ticket.findMany({
          where: { isComplete: true },
          include: {
            client: {
              select: { id: true, name: true, number: true },
            },
            assignedTo: {
              select: { id: true, name: true },
            },
            team: {
              select: { id: true, name: true },
            },
          },
        });

        reply.send({
          tickets: tickets,
          sucess: true,
        });
      }
    }
  );

  // Get all unassigned tickets
  fastify.get(
    "/api/v1/tickets/unassigned",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];
      const token = checkToken(bearer);

      if (token) {
        const tickets = await prisma.ticket.findMany({
          where: { isComplete: false, userId: null },
          include: {
            client: {
              select: { id: true, name: true, number: true },
            },
            assignedTo: {
              select: { id: true, name: true },
            },
            team: {
              select: { id: true, name: true },
            },
          },
        });

        reply.send({
          tickets: tickets,
          sucess: true,
        });
      }
    }
  );

  // export all tickets (admin only)

  // import all tickets (admin only)

  // Delete a ticket (soft delete by admin only)

  // Update a ticket

  // Transfer a ticket to another user

  // Link a ticket to another ticket

  // Unlink a ticket from another ticket

  // Comment on a ticket

  // Update status of a ticket

  // Get all tickets that created via imap
}
