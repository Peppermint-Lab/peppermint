import { ArrowTrendingUpIcon } from "@heroicons/react/20/solid";

const { prisma } = require("../../../../../prisma/prisma");

export default async function getById(req, res) {
  const { id } = req.query;

  try {
    await prisma.ticket
      .findUnique({
        where: {
          id: id,
        },
        include: {
          client: {
            select: { id: true, name: true, number: true, notes: true },
          },
          assignedTo: {
            select: { id: true, name: true },
          },
          Comment: true
        },
      })
      .then((tickets) => {
        res.status(200).json({ ticket: tickets });
      });
  } catch (error) {
    console.log(error);
    return res.status(404);
  }
}
