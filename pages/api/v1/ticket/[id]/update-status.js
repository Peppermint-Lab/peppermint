const { prisma } = require("../../../../../prisma/prisma");

export default async function completeTicket(req, res) {
  const { id } = req.query;

  const { status } = req.body

  try {
    await prisma.ticket.update({
      where: { id: Number(id) },
      data: {
        isComplete: status,
      },
    });

    res.status(200).json({ message: "Status Updated" });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
}
