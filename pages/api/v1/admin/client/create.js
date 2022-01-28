const { prisma } = require("../../../../../prisma/prisma");
import { getSession } from "next-auth/react";

export default async function createClient(req, res) {
  const session = await getSession({ req });

  try {
    if (session.user.isAdmin) {
      const { email, name, contactName, number } = req.body;
      if (!email || !name || !contactName || !number) {
        return res.status(422).json({ error: "Please add all fields" });
      }

      // await prisma.client.findUnique({
      //   where: { name: req.body.name }
      // }).then(async (dupeClient) => {
      //   if (dupeClient) {
      //     return res.status(422).json({ error: "client already exists" });
      //   }
      await prisma.client.create({
        data: {
          name,
          email,
          contactName,
          number,
        },
      });
      res.status(200).json({ message: "Client saved successfully" });
      // });
    } else {
      res.status(500).json({ message: "You are not an admin" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
