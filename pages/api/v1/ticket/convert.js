const { prisma } = require("../../../../prisma/prisma");

export default async function convert() {
    const { data } = req.body;
  const t = data._id;

  try {
    await prisma.ticket.update({
      where: { id: Number(t) },
      data: {
        isIssued: true,
        userId: Number(req.user.id),
      },
    });

    await prisma.ticket
      .findMany({
        where: {
          isIssued: false,
        },
        include: {
          client: {
            select: { id: true, name: true },
          },
        },
      })
      .then((tickets) => {
        res.status(201).json({
          tickets,
        });
      });
  } catch (error) {
    console.log(error);
  }
}