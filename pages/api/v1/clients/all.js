const { prisma } = require("../../../../prisma/prisma");

export default async function getAllClients(req, res) {
  try {
    
    const clients = await prisma.client.findMany();
    res.status(200).json({ clients });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
