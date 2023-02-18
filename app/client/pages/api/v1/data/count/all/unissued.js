const { prisma } = require("../../../../../../prisma/prisma");

export default async function handler(req, res) {
  try {
    const result = await prisma.ticket.count({
      where: { isIssued: false },
    });

    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
