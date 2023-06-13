const { prisma } = require("../../../../prisma/prisma");
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  const { time, id, title } = req.body;

  console.log(time, id, title);

  try {
    if (session) {
      const timeTracked = await prisma.timeTracking.create({
        data: {
          title,
          ticketId: id,
          time: Number(time),
          userId: session.user.id,
        },
      });

      res.status(200).json({
        message: "Time tracked & linked to the ticket",
        timeTracked,
        success: true,
      });
    } else {
      res
        .status(403)
        .json({ message: "Not authorised sorry :) ", success: false });
    }
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
}
