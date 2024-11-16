import { prisma } from "../../../prisma";

export async function priorityNotification(
  issue: any,
  updatedBy: any,
  oldPriority: string,
  newPriority: string
) {
  try {
    const text = `Priority changed on #${issue.Number} from ${oldPriority} to ${newPriority} by ${updatedBy.name}`;

    // Get all followers of the ticket, ensuring the creator is not already a follower
    const followers = [
      ...(issue.following || []),
      ...(issue.following?.includes(issue.createdBy.id)
        ? []
        : [issue.createdBy.id]),
    ];

    // Create notifications for all followers (except the person who updated)
    await prisma.notifications.createMany({
      data: followers
        .filter((userId: string) => userId !== updatedBy.id)
        .map((userId: string) => ({
          text,
          userId,
          ticketId: issue.id,
        })),
    });
  } catch (error) {
    console.error("Error creating priority change notifications:", error);
  }
}
