const { prisma } = require("../../../../prisma/prisma");

export default async function unCompleteTicket(req,res) {
  try {
    await prisma.ticket.update({
      where: { id: Number(req.body.id) },
      data: {
        issue: req.body.issue,
        note: req.body.note,
      },
    });
    res.status(201).json({ success: true, message: "Ticket saved" });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
}
