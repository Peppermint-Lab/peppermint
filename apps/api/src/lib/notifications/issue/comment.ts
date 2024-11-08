import { prisma } from "../../../prisma";

/**
 * Creates a new comment notification.
 * 
 * @param {string} userId - The ID of the user to notify.
 * @param {object} ticket - The ticket object related to the comment.
 * @param {string} comment - The content of the comment.
 * @returns {Promise<void>}
 */
export async function commentNotification(userId: string, ticket: any, user: string) {
  try {
    const text = `New comment on #${ticket.Number} by ${user}`;
    return await prisma.notifications.create({
      data: {
        text,
        userId,
        ticketId: ticket.id,
      },
    });
  } catch (error) {
    console.error("Error creating comment notification:", error);
  }
}
