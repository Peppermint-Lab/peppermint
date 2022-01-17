const { prisma } = require("../../../../../prisma/prisma");

export default async function getAllClients(req, res) {
  try {
    
    await prisma.client.update({
        where: { id: Number(req.body.id) },
        data: {
          name: req.body.clientName,
          contactName: req.body.name,
          email: req.body.email,
          number: String(req.body.number),
        }
      });
      
    res.status(200).json({ success: true });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
