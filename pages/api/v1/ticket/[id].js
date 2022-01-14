const { prisma } = require("../../../../prisma/prisma");

export default async function getById() {
  try {
    await prisma.ticket
      .findUnique({
        where: {
          id: Number(req.params.id),
        },
        include: {
          client: {
            select: { id: true, name: true, number: true },
          },
          assignedTo: {
            select: { id: true, firstName: true, lastName: true },
          },
        },
      })
      .then((tickets) => {
        res.json({ tickets });
      });
  } catch (error) {
    console.log(error);
    return res.status(404);
  }
}
