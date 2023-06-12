const { prisma } = require("../../../../../prisma/prisma");
import { getSession } from "next-auth/react";

export default async function listFiles(req, res) {
  const session = await getSession({ req });

  try {
    if (session) {
      const files = await prisma.userFile.findMany({
        where: { userId: session.id },
      });
      res.status(200).json({ sucess: true, files });
    } else {
      res.status(403).json({ message: "unauthenticated", failed: true });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error, failed: true });
  }
}
