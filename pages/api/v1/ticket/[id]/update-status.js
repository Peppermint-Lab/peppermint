const { prisma } = require("../../../../../prisma/prisma");
import nodeMailer from "nodemailer";

export default async function completeTicket(req, res) {
  const { id } = req.query;

  const { status } = req.body;

  let testAccount = await nodeMailer.createTestAccount();

  try {
    const ticket = await prisma.ticket.update({
      where: { id: Number(id) },
      data: {
        isComplete: status,
      },
    });

    let mail;

    if (process.env.NODE_ENV === "development") {
      mail = nodeMailer.createTransport({
        port: 1025,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });
    }

    let info = await mail.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: ticket.email, // list of receivers
      subject: `Ticket ${id} status is now ${ticket.isComplete ? 'COMPLETED' : 'OUTSTANDING'}`, // Subject line
      text: `Hello there, Ticket ${id}, which you reported on ${ticket.createdAt}, now has a status of ${ticket.isComplete ? 'COMPLETED' : 'OUTSTANDING'}`, // plain text body
      html: `Hello there, <br>Your Ticket, which was #${id}, which you reported on ${ticket.createdAt}, now has a status of ${ticket.isComplete ? 'COMPLETED' : 'OUTSTANDING'}`, // html body
    });

    console.log("Message sent: %s", info.messageId);

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodeMailer.getTestMessageUrl(info));

    res.status(200).json({ message: "Status Updated" });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
}
