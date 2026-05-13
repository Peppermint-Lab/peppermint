import handlebars from "handlebars";
import { prisma } from "../../../prisma";
import { createTransportProvider } from "../transport";

export async function sendAssignedEmail(email: string, ticket?: any) {
  try {
    const provider = await prisma.email.findFirst();

    if (provider) {
      const mail = await createTransportProvider();

      console.log("Sending email to: ", email);

      const testhtml = await prisma.emailTemplate.findFirst({
        where: {
          type: "ticket_assigned",
        },
      });

      const ticketNumber = ticket?.Number ? `#${ticket.Number}` : "";
      const ticketTitle = ticket?.title || "a ticket";
      const fallbackHtml = `<p>Hello there, ticket ${ticketNumber} ${ticketTitle} has been assigned to you.</p>`;
      const template = handlebars.compile(testhtml?.html || fallbackHtml);
      const htmlToSend = template({
        id: ticket?.id,
        number: ticket?.Number,
        title: ticket?.title,
      });

      await mail
        .sendMail({
          from: provider?.reply,
          to: email,
          subject: ticketTitle,
          text: ticket?.Number
            ? `Hello there, ticket #${ticket.Number} (${ticketTitle}) has been assigned to you.`
            : `Hello there, a ticket has been assigned to you.`,
          html: htmlToSend,
        })
        .then((info: any) => {
          console.log("Message sent: %s", info.messageId);
        })
        .catch((err: any) =>
          console.error("Failed to send assigned ticket email:", err)
        );
    }
  } catch (error) {
    console.error("Failed to prepare assigned ticket email:", error);
  }
}
