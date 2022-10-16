const { prisma } = require("../../../../prisma/prisma");

export default async function handler(req, res) {
  try {
    await prisma.ticket
      .findMany({
        where: { isComplete: true },
      })
      .then((tickets) => {
        res.json({ tickets });
      });
  } catch (error) {
    console.log(error);
    // res.status(500);
  }
}
