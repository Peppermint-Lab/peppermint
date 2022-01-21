const { prisma } = require("../../../../prisma/prisma");

export default async function getUnissued(req,res) {
  try {
    await prisma.ticket
      .findMany({
        where: { isIssued: false },
        include: {
          client: {
            select: { id: true, name: true },
          },
        },
      })
      .then((tickets) => {
        res.status(200).json({ tickets });
      });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
}
