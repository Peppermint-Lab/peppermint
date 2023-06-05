const { prisma } = require("../../../../prisma/prisma");

/**
 * @swagger
 * /api/v1/clients/all:
 *   get:
 *     tags: [clients]
 *     description: Gets all clients 
 *     responses:
 *       200:
 *         description: returns array of clients
 */

export default async function getAllClients(req, res) {
  try {
    
    const clients = await prisma.client.findMany();
    res.status(200).json({ clients });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
