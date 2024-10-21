import handlebars from "handlebars";
import { prisma } from "../../../prisma";
import { createTransportProvider } from "../transport";

export async function sendAssignedEmail(email: any) {
  try {
    let replyto;

    const provider = await prisma.email.findFirst();

    if (provider) {
      const mail = await createTransportProvider();

      replyto = email.reply;

      console.log("Sending email to: ", email);

      const testhtml = await prisma.emailTemplate.findFirst({
        where: {
          type: "ticket_assigned",
        },
      });

      var template = handlebars.compile(testhtml?.html);
      var htmlToSend = template({}); // Pass an empty object as the argument to the template function

      await mail
        .sendMail({
          from: replyto, // sender address
          to: email, // list of receivers
          subject: `A new ticket has been assigned to you`, // Subject line
          text: `Hello there, a ticket has been assigned to you`, // plain text body
          html: htmlToSend,
        })
        .then((info: any) => {
          console.log("Message sent: %s", info.messageId);
        })
        .catch((err: any) => console.log(err));
    }
  } catch (error) {
    console.log(error);
  }
}
