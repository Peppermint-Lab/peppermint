const { prisma } = require("../../../../prisma/prisma");

export default async function handler(req, res) {
  try {
    const result = await prisma.notes
    .findMany({
      where: { userId: Number(req.user.id) },
      include: {
        createdBy: {
          select: { id: true, firstName: true, lastName: true },
        },
      },
    })

    res.status(200).json({ success: true, result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
