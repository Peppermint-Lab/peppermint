const { prisma } = require("../../../../../prisma/prisma");

export default async function transferTicket(req, res) {
  const { id } = req.query;
  const { user } = req.body;

  try {
    await prisma.ticket.update({
      where: { id: Number(id) },
      data: {
        assignedTo: {
          connect: { id: Number(user.id) },
        },
      },
    });

    res.status(200).json({ message: "Ticket Transferred" });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
}
