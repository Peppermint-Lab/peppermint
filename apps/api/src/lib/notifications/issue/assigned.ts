import { prisma } from "../../../prisma";

/**
 * Creates assignment notifications for all ticket followers.
 *
 * @param {object} ticket - The ticket object
 * @param {object} assignee - The user object being assigned
 * @param {object} assigner - The user object doing the assigning
 * @returns {Promise<void>}
 */
export async function assignedNotification(
  assignee: any,
  ticket: any,
  assigner: any
) {
  try {
    const text = `Ticket #${ticket.Number} was assigned to ${assignee.name} by ${assigner.name}`;

    // Get all followers of the ticket, ensuring the creator is not already a follower
    const followers = [
      ...(ticket.following || []),
      ...(ticket.following?.includes(ticket.createdBy.id)
        ? []
        : [ticket.createdBy.id]),
    ];

    // Create notifications for all followers (except the assigner)
    await prisma.notifications.createMany({
      data: followers
        .filter((userId: string) => userId !== assigner.id)
        .map((userId: string) => ({
          text,
          userId,
          ticketId: ticket.id,
        })),
    });
  } catch (error) {
    console.error("Error creating assignment notifications:", error);
  }
}
