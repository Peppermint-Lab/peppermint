const { prisma } = require("../../../../../prisma/prisma");

export default async function getAllClients(req, res) {
  try {
    await prisma.user
    .findUnique({
      where: { id: Number(req.body.id) },
    })

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
