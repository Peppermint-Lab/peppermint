const { prisma } = require("../../../../../prisma/prisma");

export default async function deleteUser(req, res) {

  const { id } = req.query

  try {
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    return res.status(201).json({ message: "User deleted", fail: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
