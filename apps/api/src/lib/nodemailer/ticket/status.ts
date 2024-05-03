import handlebars from "handlebars";
import nodeMailer from "nodemailer";
import { prisma } from "../../../prisma";

export async function sendTicketStatus(ticket: any) {
  let mail;
  let replyto;

  const emails = await prisma.email.findMany();

  if (emails.length > 0) {
    if (process.env.ENVIRONMENT === "development") {
      let testAccount = await nodeMailer.createTestAccount();
      mail = nodeMailer.createTransport({
        port: 1025,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });
    } else {
      const email = emails[0];
      replyto = email.reply;
      mail = nodeMailer.createTransport({
        // @ts-ignore
        host: email.host,
        port: email.port,
        secure: email.port === "465" ? true : false, // true for 465, false for other ports
        auth: {
          user: email.user, // generated ethereal user
          pass: email.pass, // generated ethereal password
        },
      });
    }

    const testhtml = await prisma.emailTemplate.findFirst({
      where: {
        type: "ticket_status_changed",
      },
    });

    var template = handlebars.compile(testhtml?.html);
    var replacements = {
      title: ticket.title,
      status: ticket.isComplete ? "COMPLETED" : "OUTSTANDING",
    };
    var htmlToSend = template(replacements);

    await mail
      .sendMail({
        from: replyto, // sender address
        to: ticket.email,
        subject: `Ticket ${ticket.Number} status is now ${
          ticket.isComplete ? "COMPLETED" : "OUTSTANDING"
        }`, // Subject line
        text: `Hello there, Ticket ${ticket.Number}, now has a status of ${
          ticket.isComplete ? "COMPLETED" : "OUTSTANDING"
        }`, // plain text body
        html: htmlToSend,
      })
      .then((info) => {
        console.log("Message sent: %s", info.messageId);
      })
      .catch((err) => console.log(err));
  }
}
