import { prisma } from "../prisma";

export async function createNotification(
  type: string,
  userId: string,
  ticket: any
) {
  try {
    let text = "";

    console.log("ticket", ticket);

    switch (type) {
      case "ticket_assigned":
        text = `Assigned Ticket #${ticket.Number}`;
        break;
      case "ticket_comment":
        text = `New comment on #${ticket.Number}`;
        break;
    }

    await prisma.notifications.create({
      data: {
        text,
        userId,
        ticketId: ticket.id,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
