const { prisma } = require("../../../../../prisma/prisma");

export default async function getNote(req, res) {

  const { id } = req.query
  try {
    const find = await prisma.client.findUnique({
      where: { id: Number(id) },
    });
    return res.status(200).json({ find });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
