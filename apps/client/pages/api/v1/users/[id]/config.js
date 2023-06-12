const { prisma } = require("../../../../../prisma/prisma");
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const { id } = req.query;
  const session = await getSession({ req });

  try {
    if (session) {
      const u = await prisma.user.findUnique({
        where: { id: id },
        select: {
          notify_ticket_created: true,
          notify_ticket_status_changed: true,
          notify_ticket_comments: true,
          notify_ticket_assigned: true,
          language: true,
        },
      });

      return res.status(200).json({ user: u, failed: false });
    } else {
      res.status(403).json({ message: "unauthenticated", failed: true });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
