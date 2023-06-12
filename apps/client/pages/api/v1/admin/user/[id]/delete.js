const { prisma } = require("../../../../../../prisma/prisma");
import { getSession } from "next-auth/react";

export default async function deleteUser(req, res) {
  const { id } = req.query;
  const session = await getSession({ req });

  try {
    if (session) {
      await prisma.user.delete({
        where: { id: id },
      });
      return res.status(201).json({ message: "User deleted", fail: false });
    } else {
      res.status(403).json({ message: "unauthenticated", failed: true });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
