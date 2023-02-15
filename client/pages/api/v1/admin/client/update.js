const { prisma } = require("../../../../../prisma/prisma");
import { getSession } from "next-auth/react";

export default async function getAllClients(req, res) {
  const session = await getSession({ req });

  const { name, email, number, contactName, id } = req.body;

  try {
    if (session.user.isAdmin) {
      await prisma.client.update({
        where: { id: Number(id) },
        data: {
          name,
          contactName,
          email,
          number: String(number),
        },
      });

      res.status(200).json({ success: true });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
