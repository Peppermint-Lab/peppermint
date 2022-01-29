const { prisma } = require("../../../../../prisma/prisma");
import { getSession } from "next-auth/react";

export default async function createWebhook(req, res) {
  const session = await getSession({ req });

  const { name, url, type } = req.body;

  try {
    if (session.user.isAdmin) {
      const hooks = prisma.webhooks.findMany();

      console.log(hooks);

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
