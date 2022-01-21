const { prisma } = require("../../../../prisma/prisma");

import bcrypt from "bcrypt";

export default async function getAllClients(req, res) {
  const { password } = req.body;

  try {
    const hashedPass = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: {
        password: hashedPass,
      },
    });
    res
      .status(201)
      .json({ message: "password updated success", failed: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
