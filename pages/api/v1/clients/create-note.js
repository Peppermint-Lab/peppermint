const { prisma } = require("../../../../../prisma/prisma");

export default async function getAllClients(req, res) {
  try {
      
    await prisma.client.update({
        where: { id: Number(req.body.id) },
        data: { notes: req.body.note }
      });

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
