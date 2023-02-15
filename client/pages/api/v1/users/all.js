const { prisma } = require("../../../../prisma/prisma");

/**
 * @swagger
 * /api/v1/users/all:
 *   get:
 *     tags: [users]
 *     description: Returns all users
 *     responses:
 *       200:
 *         description: Array of all users
 */

export default async function getAllClients(req, res) {
  try {
    const users = await prisma.user.findMany({
      where: {},
      select: {
        email: true,
        name: true,
        id: true,
        isAdmin: true,
        language: true
      }
    });

    res.json({ users, failed: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
