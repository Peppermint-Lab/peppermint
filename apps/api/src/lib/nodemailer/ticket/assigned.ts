import handlebars from "handlebars";
import nodeMailer from "nodemailer";
import { prisma } from "../../../prisma";

export async function sendAssignedEmail(email: any) {
  try {
    let mail;
    let replyto;

    const emails = await prisma.email.findMany();

    if (emails.length > 0) {
      if (process.env.ENVIRONMENT === "development") {
        // let testAccount = await nodeMailer.createTestAccount();
        mail = nodeMailer.createTransport({
          host: "localhost",
          port: 1025,
          auth: {
            user: "project.1",
            pass: "secret.1",
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
        .then((info) => {
          console.log("Message sent: %s", info.messageId);
        })
        .catch((err) => console.log(err));
    }
  } catch (error) {
    console.log(error);
  }
}
