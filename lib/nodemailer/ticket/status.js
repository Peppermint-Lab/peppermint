import nodeMailer from "nodemailer";
import { prisma } from "../../../prisma/prisma";

export async function sendTicketStatus(ticket) {
  let mail;

  const emails = await prisma.email.findMany();

  if (process.env.NODE_ENV === "development") {
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
    mail = nodeMailer.createTransport({
      host: email.host,
      port: email.port,
      secure: email.secure, // true for 465, false for other ports
      auth: {
        user: email.user, // generated ethereal user
        pass: email.pass, // generated ethereal password
      },
    });
  }

  let info = await mail.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: ticket.email,
    subject: `Ticket ${ticket.id} status is now ${
      ticket.isComplete ? "COMPLETED" : "OUTSTANDING"
    }`, // Subject line
    text: `Hello there, Ticket ${ticket.id}, which you reported on ${
      ticket.createdAt
    }, now has a status of ${ticket.isComplete ? "COMPLETED" : "OUTSTANDING"}`, // plain text body
    html: `<!doctype html>
    <html>
    <p>Hello there, <br>Your Ticket, which was #${
      ticket.id
    }, which you reported on ${ticket.createdAt}, now has a status of ${
      ticket.isComplete ? "COMPLETED" : "OUTSTANDING"
    }</p>
    <p><br>Kind regards, <br> This is a no reply email
    <p>This is was an automated message sent by peppermint.sh -> An open source helpdesk solution</p>
    </html>
    `, // html body
  });

  console.log("Message sent: %s", info.messageId);

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodeMailer.getTestMessageUrl(info));
}
