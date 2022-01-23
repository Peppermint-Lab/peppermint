const { prisma } = require("../../../../../prisma/prisma");

export default async function completeTicket(req, res) {
  const { id } = req.query;

  try {
    await prisma.ticket.update({
      where: { id: Number(id) },
      data: {
        isComplete: true,
        isIssued: false,
      },
    });

    res.status(200).json({ message: "Ticket Completed" });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
}
