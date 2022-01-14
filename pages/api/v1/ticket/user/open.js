const { prisma } = require("../../../../../prisma/prisma");


export default async function userOpen() {
    try {
        await prisma.ticket
          .findMany({
            where: { isIssued: true, userId: Number(req.user.id) },
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