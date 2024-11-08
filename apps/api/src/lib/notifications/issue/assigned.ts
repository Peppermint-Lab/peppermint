import { prisma } from "../../../prisma";

export async function assignedNotification(
  userId: string,
  ticket: any
) {
  try {
    return await prisma.notifications.create({
      data: {
        text: `Assigned Ticket #${ticket.Number}`,
        userId,
        ticketId: ticket.id,
      },
    });
  } catch (error) {
    console.error("Error creating notification:", error);
  }
}
