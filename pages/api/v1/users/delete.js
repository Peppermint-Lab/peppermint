const { prisma } = require("../../../../prisma/prisma");


export default async function getAllClients(req, res) {
  try {
    await prisma.user.delete({
      where: { id: Number(req.params.id) },
    });
    return res.status(201).json({ message: "User deleted", fail: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
