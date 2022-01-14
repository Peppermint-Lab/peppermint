const { prisma } = require("../../../../../prisma/prisma");

export default async function getUserCompleted() {
  try {
    await prisma.ticket
      .findMany({
        where: { isComplete: true, userId: Number(req.user.id) },
      })
      .then((tickets) => {
        res.json({ tickets });
      });
    return res.status(200);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
}
