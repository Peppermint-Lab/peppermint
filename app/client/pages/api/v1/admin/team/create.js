// Create team

const { prisma } = require("../../../../../prisma/prisma");
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  const { members, name } = req.body;

  const new_data = [];

  if (members !== undefined) {
    for (let i = 0; i < members.length; i++) {
      new_data.push({
        name: name,
        members: {
          connect: {
            id: members[i].id,
          },
        },
      });
    }
  }

  try {
    if (session.user) {
      if (session.user.isAdmin) {
        const team = await prisma.team.createMany({
          data: {
            name: name,
            levels: {
              low: true,
              medium: true,
              high: true,
            },
          },
        });

        res.status(200).json({ success: true, team: team });
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
