import nodeMailer from "nodemailer";
import { prisma } from "../../../prisma/prisma";

export async function sendTicketCreate(ticket) {
  try {
    let mail;

    const emails = await prisma.email.findMany();

    if (process.env.NODE_ENV !== "development") {
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
      from: '"No reply 👻" noreply@peppermint.sh', // sender address
      to: ticket.email,
      subject: `Ticket #${ticket.id} has just been created & logged`, // Subject line
      text: `Hello there, Ticket ${ticket.id}, which you reported on ${ticket.createdAt}, has now been created and logged`, // plain text body
      html: `<!doctype html>
    <html>
    <p>Hello there, <br>Your Ticket #${ticket.id}, which you reported on ${ticket.createdAt}, has now been created and logged</p>
    <p><br>Kind regards, <br> This is a no reply email
    <p>This was an automated message sent by peppermint.sh -> An open source helpdesk solution</p>
   
    </html>
    `, // html body
      //  <img style={{ text-align: centre }} src="https://peppermint.sh/images/logo_green.svg" width="250px" />
    });

    console.log("Message sent: %s", info.messageId);

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodeMailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error);
  }
}
