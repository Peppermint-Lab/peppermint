const { prisma } = require("../../../../prisma/prisma");

export default async function getAllClients(req, res) {
  try {
    const users = await prisma.user.findMany({
      where: {},
      select: {
        email: true,
        name: true,
        id: true,
        isAdmin: true
      }
    });

    res.json({ users, failed: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
