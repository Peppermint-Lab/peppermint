const { prisma } = require("../../../../../prisma/prisma");

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    await prisma.notes.update({
      where: { id: Number(id) },
      data: {
        note: req.body.note,
        title: req.body.title,
      },
    });

    res.status(200).json({ success: true, message: "Note Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
