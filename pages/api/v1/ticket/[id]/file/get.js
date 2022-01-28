const { prisma } = require("../../../../../../prisma/prisma");

export default async function getFiles(req, res) {
  const { id } = req.query;

  try {
    const files = await prisma.ticketFile.findMany({
      where: { ticketId: Number(id) },
    });
    res.status(200).json({ sucess: true, files });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error, failed: true });
  }
}
