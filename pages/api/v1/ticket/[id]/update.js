const { prisma } = require("../../../../../prisma/prisma");

export default async function updateTicket(req,res) {

  const { id } = req.query

  const  { note, issue } = req.body

  try {
    await prisma.ticket.update({
      where: { id: Number(id) },
      data: {
        issue,
        note
      },
    });
    res.status(201).json({ success: true, message: "Ticket saved" });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
}
