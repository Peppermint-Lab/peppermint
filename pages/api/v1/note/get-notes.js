const { prisma } = require("../../../../prisma/prisma");
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  try {
    const notebooks = await prisma.notes.findMany({
      where: { userId: Number(session.id) },
    });

    res.status(200).json({ success: true, notebooks });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
