const { prisma } = require("../../../../../prisma/prisma");
import { getSession } from "next-auth/react";

import bcrypt from "bcrypt";

export default async function getAllClients(req, res) {
  const { password, id } = req.body;
  const session = await getSession({ req });

  try {
    if (session.user.isAdmin) {
      const hashedPass = await bcrypt.hash(password, 10);
      await prisma.user.update({
        where: { id: Number(id) },
        data: {
          password: hashedPass,
        },
      });
      res
        .status(201)
        .json({ message: "password updated success", failed: false });
    } else {
      res.status(422).json({ message: "You are not auth'd", failed: true });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
