// Update emails settings
const { prisma } = require("../../../../../../prisma/prisma");
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  try {
    if (session.user) {
      if (session.user.isAdmin) {
        const { host, reply, port, username, password } = req.body;

        await prisma.email.upsert({
          where: { id: 1 },
          update: {
            host,
            reply,
            port,
            user: username,
            pass: password,
            active: true,
            secure: port === 465 ? true : false,
          },
          create: {
            host,
            reply,
            port,
            user: username,
            pass: password,
            active: true,
            secure: port === 465 ? true : false,
          },
        });

        res.status(200).json({ success: true });
      } else {
        res.status(403).json({ error: "Forbidden" });
      }
    } else {
      res.status(403).json({ error: "Not authorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
}
