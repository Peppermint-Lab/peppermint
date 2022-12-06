const { prisma } = require("../../../../../prisma/prisma");

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { id } = req.query;
      const { ticket } = req.body;

      const prev = await prisma.ticket.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      const ids = [];

      if (prev.length !== undefined && prev.linked.length > 0) {
        ids.push(...prev.linked);
      }

      ids.push({
        id: ticket.id,
        title: ticket.title,
      });

      const data = await prisma.ticket.update({
        where: {
          id: parseInt(id),
        },
        data: {
          linked: {
            ...ids,
          },
        },
      });

      res.status(200).json({ data });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error", error: error });
  }
}
