import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import axios from "axios";
import { checkToken } from "../lib/jwt";

//@ts-ignore
import { track } from "../lib/hog";
import { sendAssignedEmail } from "../lib/nodemailer/ticket/assigned";
import { sendComment } from "../lib/nodemailer/ticket/comment";
import { sendTicketCreate } from "../lib/nodemailer/ticket/create";
import { sendTicketStatus } from "../lib/nodemailer/ticket/status";
import { checkSession } from "../lib/session";
import { prisma } from "../prisma";

export function ticketRoutes(fastify: FastifyInstance) {
  // Create a new ticket
  fastify.post(
    "/api/v1/ticket/create",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const {
        name,
        company,
        detail,
        title,
        priority,
        email,
        engineer,
        type,
      }: any = request.body;

      const ticket: any = await prisma.ticket.create({
        data: {
          name,
          title,
          detail,
          priority: priority ? priority : "low",
          email,
          type: type ? type.toLowerCase() : "support",
          client:
            company !== undefined
              ? {
                  connect: { id: company.id || company },
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
      });

      const webhook = await prisma.webhooks.findMany({
        where: {
          type: "ticket_created",
        },
      });

      await sendTicketCreate(ticket);

      if (engineer && engineer.name !== "Unassigned") {
        const assgined = await prisma.user.findUnique({
          where: {
            id: ticket.userId,
          },
        });

        await sendAssignedEmail(assgined!.email);
      }

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
          });
        }
      }

      const hog = track();

      hog.capture({
        event: "ticket_created",
        distinctId: ticket.id,
      });

      reply.status(200).send({
        message: "Ticket created correctly",
        success: true,
        id: ticket.id,
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
          where: { isComplete: false, hidden: false },
          orderBy: [
            {
              createdAt: "desc",
            },
          ],
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
          where: { isComplete: false, userId: user!.id, hidden: false },
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
          where: { isComplete: true, hidden: false },
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
            hidden: false,
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
      const bearer = request.headers.authorization!.split(" ")[1];
      const token = checkToken(bearer);

      const { user, id }: any = request.body;

      if (token) {
        const assigned = await prisma.user.update({
          where: { id: user },
          data: {
            tickets: {
              connect: {
                id: id,
              },
            },
          },
        });

        const { email } = assigned;

        await sendAssignedEmail(email);

        reply.send({
          success: true,
        });
      }
    }
  );

  // Link a ticket to another ticket

  // fastify.post(
  //   "/api/v1/ticket/link",

  //   async (request: FastifyRequest, reply: FastifyReply) => {
  //     const { ticket, id }: any = request.body;

  //     const prev: any = await prisma.ticket.findUnique({
  //       where: {
  //         id: id,
  //       },
  //     });

  //     const ids = [];

  //     if (prev.length !== undefined && prev.linked.length > 0) {
  //       ids.push(...prev.linked);
  //     }

  //     ids.push({
  //       id: ticket.id,
  //       title: ticket.title,
  //     });

  //     const data = await prisma.ticket.update({
  //       where: {
  //         id: id,
  //       },
  //       data: {
  //         linked: {
  //           ...ids,
  //         },
  //       },
  //     });
  //   }
  // );

  // Unlink a ticket from another ticket
  // fastify.post(
  //   "/api/v1/ticket/unlink",

  //   async (request: FastifyRequest, reply: FastifyReply) => {}
  // );

  // Comment on a ticket
  fastify.post(
    "/api/v1/ticket/comment",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];
      const token = checkToken(bearer);

      const { text, id, public: public_comment }: any = request.body;

      if (token) {
        const user = await checkSession(bearer);

        await prisma.comment.create({
          data: {
            text: text,
            public: public_comment,
            ticketId: id,
            userId: user!.id,
          },
        });

        const ticket = await prisma.ticket.findUnique({
          where: {
            id: id,
          },
        });

        //@ts-expect-error
        const { email, title } = ticket;

        if (public_comment && email) {
          sendComment(text, title, email);
        }

        const hog = track();

        hog.capture({
          event: "ticket_comment",
          distinctId: ticket!.id,
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
      const bearer = request.headers.authorization!.split(" ")[1];
      const token = checkToken(bearer);

      if (token) {
        const { status, id }: any = request.body;

        const ticket: any = await prisma.ticket.update({
          where: { id: id },
          data: {
            isComplete: status,
          },
        });

        const webhook = await prisma.webhooks.findMany({
          where: {
            type: "ticket_status_changed",
          },
        });

        for (let i = 0; i < webhook.length; i++) {
          if (webhook[i].active === true) {
            const s = status ? "Completed" : "Outstanding";
            await axios.post(`${webhook[i].url}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                data: `Ticket ${ticket.id} created by ${ticket.email}, has had it's status changed to ${s}`,
              }),
              redirect: "follow",
            });
          }
        }

        sendTicketStatus(ticket);

        reply.send({
          success: true,
        });
      }
    }
  );

  // Hide a ticket
  fastify.put(
    "/api/v1/ticket/status/hide",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const bearer = request.headers.authorization!.split(" ")[1];
      const token = checkToken(bearer);

      if (token) {
        const { hidden, id }: any = request.body;

        await prisma.ticket
          .update({
            where: { id: id },
            data: {
              hidden: hidden,
            },
          })
          .then(async (ticket) => {
            // await sendTicketStatus(ticket);
          });

        reply.send({
          success: true,
        });
      }
    }
  );

  // Get all tickets that created via imap
  fastify.get(
    "/api/v1/tickets/imap/all",

    async (request: FastifyRequest, reply: FastifyReply) => {}
  );
}
