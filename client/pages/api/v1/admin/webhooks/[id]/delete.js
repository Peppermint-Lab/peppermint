const { prisma } = require("../../../../../../prisma/prisma");
import { getSession } from "next-auth/react";

export default async function getAllHooks(req, res) {
  const session = await getSession({ req });

  const { id } = req.query;

  try {
    if (session.user.isAdmin) {
      await prisma.webhooks.delete({
        where: {
          id: Number(id),
        },
      });

      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ error: "You are not an admin ", success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, success: false });
  }
}
