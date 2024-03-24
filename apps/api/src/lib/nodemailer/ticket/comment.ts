import handlebars from "handlebars";
import nodeMailer from "nodemailer";
import { prisma } from "../../../prisma";

export async function sendComment(
  comment: string,
  title: string,
  email: string
) {
  try {
    let mail;
    let replyto;

    console.log("Sending email to: ", email);

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
          type: "ticket_comment",
        },
      });

      var template = handlebars.compile(testhtml?.html);
      var replacements = {
        title: title,
        comment: comment,
      };
      var htmlToSend = template(replacements);

      await mail
        .sendMail({
          from: '"No reply 👻" ' + replyto, // sender address
          to: email,
          subject: `New comment on a ticket`, // Subject line
          text: `Hello there, Ticket: ${title}, has had an update with a comment of ${comment}`, // plain text body
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
