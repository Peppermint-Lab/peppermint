import handlebars from "handlebars";
import { prisma } from "../../../prisma";
import { createTransportProvider } from "../transport";

function getStatusLabel(ticket: any) {
  return ticket.isComplete ? "Closed" : "Open";
}

export async function sendTicketStatus(ticket: any) {
  try {
    const email = await prisma.email.findFirst();

    if (email) {
      const transport = await createTransportProvider();

      const recipients = [
        ticket.email,
        ticket.assignedTo?.email,
      ].filter(Boolean);

      const uniqueRecipients = [...new Set(recipients)];

      if (uniqueRecipients.length === 0) {
        console.log("No recipients found for ticket status email.");
        return;
      }

      const status = getStatusLabel(ticket);
      const testhtml = await prisma.emailTemplate.findFirst({
        where: {
          type: "ticket_status_changed",
        },
      });

      const fallbackHtml = `<p>Hello there, ticket #${ticket.Number} (${ticket.title}) is now ${status}.</p>`;
      const template = handlebars.compile(testhtml?.html || fallbackHtml);
      const replacements = {
        id: ticket.id,
        number: ticket.Number,
        title: ticket.title,
        status,
      };
      const htmlToSend = template(replacements);

      await transport
        .sendMail({
          from: email?.reply,
          to: uniqueRecipients,
          subject: ticket.title,
          text: `Hello there, ticket #${ticket.Number} (${ticket.title}) is now ${status}.`,
          html: htmlToSend,
        })
        .then((info: any) => {
          console.log("Message sent: %s", info.messageId);
        })
        .catch((err: any) =>
          console.error("Failed to send ticket status email:", err)
        );
    }
  } catch (error) {
    console.error("Failed to prepare ticket status email:", error);
  }
}
