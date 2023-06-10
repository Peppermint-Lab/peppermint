import { ArrowTrendingUpIcon } from "@heroicons/react/20/solid";

const { prisma } = require("../../../../../prisma/prisma");

export default async function getById(req, res) {
  const { id } = req.query;

  try {
    const ticket = await prisma.ticket.findUnique({
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
      },
    });

    const comments = await prisma.comment.findMany({
      where: {
        ticketId: ticket.id,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    var t = {
      ...ticket,
      comments: [...comments],
    };

    res.status(200).json({ ticket: t });
  } catch (error) {
    console.log(error);
    return res.status(404);
  }
}
