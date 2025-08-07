import { prisma } from "../../../prisma";

/**
 * Creates comment notifications for all ticket followers.
 *
 * @param {object} ticket - The ticket object related to the comment.
 * @param {object} commenter - The user object who commented.
 * @returns {Promise<void>}
 */
export async function commentNotification(issue: any, commenter: any) {
  try {
    const text = `New comment on #${issue.Number} by ${commenter.name}`;

    // Get all followers of the ticket, ensuring the creator is not already a follower
    const followers = [
      ...(issue.following || []),
      ...(issue.following?.includes(issue.createdBy.id)
        ? []
        : [issue.createdBy.id]),
    ];

    // Create notifications for all followers (except the commenter)
    await prisma.notifications.createMany({
      data: followers
        .filter((userId: string) => userId !== commenter.id)
        .map((userId: string) => ({
          text,
          userId,
          ticketId: issue.id,
        })),
    });
  } catch (error) {
    console.error("Error creating comment notifications:", error);
  }
}
