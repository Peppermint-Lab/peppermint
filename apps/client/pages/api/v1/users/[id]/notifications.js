const { prisma } = require("../../../../../prisma/prisma");
import { getSession } from "next-auth/react";

export default async function notifications(req, res) {
  const session = await getSession({ req });
  const { id } = req.query;

  const { ticket_assigned, ticket_creation, ticket_status } = req.body;

  try {
    if (session) {
      await prisma.user.update({
        where: { id: id },
        data: {
          notify_ticket_assigned: ticket_assigned,
          notify_ticket_comments: true,
          notify_ticket_created: ticket_creation,
          notify_ticket_status_changed: ticket_status,
        },
      });
      return res.status(200).json({ message: "option Updated", failed: false });
    } else {
      res.status(403).json({ message: "unauthenticated", failed: true });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
