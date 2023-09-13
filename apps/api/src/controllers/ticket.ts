import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import axios from "axios";
import { checkToken } from "../lib/jwt";
import { checkSession } from "../lib/session";
import { prisma } from "../prisma";

export function ticketRoutes(fastify: FastifyInstance) {
  // Create a new ticket
  fastify.post(
    "/api/v1/ticket/create",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const { name, company, detail, title, priority, email, engineer }: any =
        request.body;

      const ticket: any = await prisma.ticket
        .create({
          data: {
            name,
            title,
            detail,
            priority: priority ? priority : "low",
            email,
            client:
              company !== undefined
                ? {
                    connect: { id: company.id },
                  }
                : undefined,
            fromImap: false,
            assignedTo:
              engineer && engineer.name !== "Unassigned"
                ? {
                    connect: { id: engineer.id },
                  }
                : undefined,
            isComplete: Boolean(false),
          },
        })
        .then((ticket) => {
          console.log(ticket);
          // sendTicketCreate(ticket);
        });

      const webhook = await prisma.webhooks.findMany({
        where: {
          type: "ticket_created",
        },
      });

      for (let i = 0; i < webhook.length; i++) {
        if (webhook[i].active === true) {
          console.log(webhook[i].url);
          await axios.post(`${webhook[i].url}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: `Ticket ${ticket.id} created by ${ticket.name} -> ${ticket.email}. Priority -> ${ticket.priority}`,
            }),
            redirect: "follow",
          });
        }
      }

      reply.status(200).send({
        message: "Ticket created correctly",
        success: true,
      });
    }
  );

  // Get a ticket by id
  fastify.get(
    "/api/v1/ticket/:id",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];
      const token = checkToken(bearer);

      const { id }: any = request.params;

      if (token) {
        const ticket = await prisma.ticket.findUnique({
          where: {
            id: id,
          },
          include: {
            client: {
              select: { id: true, name: true, number: true, notes: true },
            },
            assignedTo: {
              select: { id: true, name: true },
            },
          },
        });

        const timeTracking = await prisma.timeTracking.findMany({
          where: {
            ticketId: id,
          },
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        });

        const comments = await prisma.comment.findMany({
          where: {
            ticketId: ticket!.id,
          },
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        });

        var t = {
          ...ticket,
          comments: [...comments],
          TimeTracking: [...timeTracking],
        };

        reply.send({
          ticket: t,
          sucess: true,
        });
      }
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
          where: {
            isComplete: false,
            assignedTo: null,
          },
        });

        reply.send({
          success: true,
          tickets: tickets,
        });
      }
    }
  );

  // Update a ticket
  fastify.put(
    "/api/v1/ticket/update",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];
      const token = checkToken(bearer);

      const { id, note, detail, title, priority, status }: any = request.body;

      if (token) {
        await prisma.ticket.update({
          where: { id: id },
          data: {
            detail,
            note,
            title,
            priority,
            status,
          },
        });

        reply.send({
          success: true,
        });
      }
    }
  );

  // Transfer a ticket to another user
  fastify.post(
    "/api/v1/ticket/transfer",

    async (request: FastifyRequest, reply: FastifyReply) => {
      // check jwt is valid
      // check user is admin
    }
  );

  // Link a ticket to another ticket
  fastify.post(
    "/api/v1/ticket/link",

    async (request: FastifyRequest, reply: FastifyReply) => {
      // check jwt is valid
      // check user is admin
    }
  );

  // Unlink a ticket from another ticket
  fastify.post(
    "/api/v1/ticket/unlink",

    async (request: FastifyRequest, reply: FastifyReply) => {
      // check jwt is valid
      // check user is admin
    }
  );

  // Comment on a ticket
  fastify.post(
    "/api/v1/ticket/comment",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];
      const token = checkToken(bearer);

      const { text, id }: any = request.body;

      if (token) {
        const user = await checkSession(bearer);

        await prisma.comment.create({
          data: {
            text: text,
            public: Boolean(false),
            ticketId: id,
            userId: user!.id,
          },
        });

        reply.send({
          success: true,
        });
      }
    }
  );

  // Update status of a ticket
  fastify.put(
    "/api/v1/ticket/status/update",

    async (request: FastifyRequest, reply: FastifyReply) => {
      //   await prisma.ticket
      //   .update({
      //     where: { id: id },
      //     data: {
      //       isComplete: status,
      //     },
      //   })
      //   .then(async (ticket) => {
      //     await sendTicketStatus(ticket);
      //   });
      // const webhook = await prisma.webhooks.findMany({
      //   where: {
      //     type: "ticket_status_changed",
      //   },
      // });
      // for (let i = 0; i < webhook.length; i++) {
      //   if (webhook[i].active === true) {
      //     const s = status ? "Completed" : "Outstanding";
      //     await fetch(`${webhook[i].url}`, {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify({
      //         data: `Ticket ${data.id} created by ${data.email}, has had it's status changed to ${s}`,
      //       }),
      //       redirect: "follow",
      //     });
      //   }
      // }
      // res.status(200).json({ message: "Status Updated" });
    }
  );

  // Get all tickets that created via imap
  fastify.get(
    "/api/v1/tickets/imap/all",

    async (request: FastifyRequest, reply: FastifyReply) => {
      // check jwt is valid
      // check user is admin
    }
  );
}
