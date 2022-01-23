const { prisma } = require("../../../../../prisma/prisma");

export default async function getAllClients(req, res) {
  try {
    const find = await prisma.client.findUnique({
      where: { id: Number(req.params.i) },
    });
    return res.status(200).json({ find });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
