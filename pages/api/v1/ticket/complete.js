const { prisma } = require("../../../../prisma/prisma");

export default async function completeTicket(req,res) {
  try {
    await prisma.ticket.update({
      where: { id: Number(req.params.id) },
      data: {
        isComplete: true,
        isIssued: false,
      },
    });

    const tickets = await prisma.ticket.findMany({
      where: { isIssued: true, userId: Number(req.user.id) },
      include: {
        client: {
          select: { id: true, name: true },
        },
        assignedTo: {
          select: { id: true, firstName: true, lastName: true },
        },
      },
    });
    res.status(200).json({ tickets });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
}
