import axios from "axios";

function getPriorityColor(priority: string): number {
  switch (priority.toLowerCase()) {
    case "high":
      return 16711680; // Red
    case "medium":
      return 16753920; // Orange
    case "low":
      return 65280; // Green
    default:
      return 8421504; // Grey
  }
}

export async function sendWebhookNotification(webhook: any, message: any) {
  if (!webhook.active) return;

  const url = webhook.url;

  if (url.includes("discord.com")) {
    const discordMessage = {
      embeds: [
        {
          title: "Issue Created",
          description: "A new issue has been created",
          color: getPriorityColor(message.priority), // Use the priority color function
          footer: {
            text: "Issue ID: " + message.id,
          },
          author: {
            name: "peppermint.sh",
            icon_url:
              "https://avatars.githubusercontent.com/u/76014454?s=200&v=4",
            url: "https://peppermint.sh/",
          },
          fields: [
            {
              name: "Title",
              value: message.title,
              inline: false,
            },
            {
              name: "Priority Level",
              value: message.priority,
              inline: false,
            },
            {
              name: "Contact Email",
              value: message.email ? message.email : "No email provided",
              inline: false,
            },
            {
              name: "Created By",
              value: message.createdBy.name,
              inline: false,
            },
            {
              name: "Assigned To",
              value: message.assignedTo
                ? message.assignedTo.name
                : "Unassigned",
              inline: false,
            },
            {
              name: "Client",
              value: message.client
                ? message.client.name
                : "No client assigned",
              inline: false,
            },
            {
              name: "Type",
              value: message.type,
              inline: false,
            },
          ],
        },
      ],
      content: "",
    };

    try {
      await axios.post(url, discordMessage);
      console.log("Discord webhook message sent successfully!");
    } catch (error: any) {
      if (error.response) {
        console.error("Discord API response error:", error.response.data);
      } else {
        console.error("Error sending Discord webhook:", error.message);
      }
      throw error;
    }
  } else {
    try {
      await axios.post(url, {
        data: message,
      });
    } catch (error) {
      console.error("Error sending webhook:", error);
    }
  }
}
