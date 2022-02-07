const { prisma } = require("../../../../../prisma/prisma");

export default async function SaveNote(req, res) {
  const { id } = req.query;

  const { note } = req.body;

  try {
    await prisma.client.update({
      where: { id: Number(id) },
      data: { notes: note },
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, success: false });
  }
}
