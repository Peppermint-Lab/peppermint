const { prisma } = require("../../../../../prisma/prisma");

export default async function getById(req, res) {
  const { id } = req.query;

  console.log(id);

  try {
    await prisma.ticket
      .findUnique({
        where: {
          id: Number(id),
        },
        include: {
          client: {
            select: { id: true, name: true, number: true, notes: true },
          },
          assignedTo: {
            select: { id: true, name: true },
          },
        },
      })
      .then((tickets) => {
        res.status(200).json({ tickets });
      });
  } catch (error) {
    console.log(error);
    return res.status(404);
  }
}
