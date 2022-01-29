const { prisma } = require("../../../../../prisma/prisma");
import { getSession } from "next-auth/react";

export default async function getAllClients(req, res) {
  const session = await getSession({ req });

  const { name, email, admin, id } = req.body;

  try {
    if (session.user.isAdmin) {
      await prisma.user.update({
        where: { id: Number(id) },
        data: {
          name,
          email,
          isAdmin: admin,
        },
      });

      res.status(200).json({ success: true });
    } else {
      res
        .status(422)
        .json({ success: false, message: "You do not have permission" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
