const { prisma } = require("../../../../prisma/prisma");

export default async function handler(req, res) {
  try {
      
    console.log(req.body);
    await prisma.notes.update({
      where: { id: Number(req.body.id) },
      data: { note: req.body.note },
    });
    console.log("Updated Note");
    res.status(201).json({ success: true, message: "Note Updated" });

    res.status(200).json({ success: true, result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
