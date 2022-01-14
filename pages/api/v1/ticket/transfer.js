const { prisma } = require("../../../../prisma/prisma");

export default async function transferTicket() {
    console.log(req.body);
  try {
    await prisma.ticket.update({
      where: { id: Number(req.body.find) },
      data: {
        assignedTo: {
          connect: { id: Number(req.body.id) },
        },
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
