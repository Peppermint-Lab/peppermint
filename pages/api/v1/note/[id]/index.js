const { prisma } = require("../../../../../prisma/prisma");
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  const id = req.query.id;

  console.log(id);

  try {
    const data = await prisma.notes.findUnique({
      where: { id: Number(id) },
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
