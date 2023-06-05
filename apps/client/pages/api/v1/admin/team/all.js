// Get all teams

const { prisma } = require("../../../../../prisma/prisma");
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  try {
    if (session.user) {
      if (session.user.isAdmin) {
        const team = await prisma.team.findMany({
          include: {
            members: true,
          },
        });

        res.status(200).json({ success: true, teams: team });
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
