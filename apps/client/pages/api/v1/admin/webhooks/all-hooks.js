const { prisma } = require("../../../../../prisma/prisma");
import { getSession } from "next-auth/react";

export default async function getAllHooks(req, res) {
  const session = await getSession({ req });

  try {
    if (session.user.isAdmin) {
      const hooks = await prisma.webhooks.findMany({});
      
      res.status(200).json({ hooks, success: true });
    } else {
      res
        .status(401)
        .json({ message: "You are not an admin ", success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error, success: false });
  }
}
