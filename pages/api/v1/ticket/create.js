const { prisma } = require("../../../../prisma/prisma");
import { sendTicketCreate } from "../../../../lib/nodemailer/ticket/status";

export default async function create(req, res) {
  const { name, company, detail, title, priority, email, engineer, issue } =
    JSON.parse(req.body);

  try {
    if (!name || !company || !title || !priority) {
      return res
        .status(422)
        .json({ error: "Please add all the fields", failed: true });
    }

    await prisma.ticket
      .create({
        data: {
          name,
          title,
          detail,
          priority,
          issue,
          email,
          client: {
            connect: { id: Number(company.id) },
          },
          assignedTo: {
            connect: { id: Number(engineer.id) },
          },
          isComplete: Boolean(false),
        },
      })
      .then((ticket) => {
        sendTicketCreate(ticket);
        res.status(201).json({ message: "Ticket created correctly", ticket });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
