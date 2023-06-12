const { prisma } = require("../../../../../prisma/prisma");
import { getSession } from "next-auth/react";

export default async function userProfile(req, res) {
  const session = await getSession({ req });
  const emailLower = req.body.email.toLowerCase();

  const { id } = req.query;

  try {
    if (session) {
      await prisma.user.update({
        where: { id: id },
        data: {
          name: req.body.name,
          email: emailLower,
        },
      });

      await prisma.user
        .findUnique({
          where: { id: Number(req.body.id) },
        })
        .then((user) => {
          const { id, name, email } = user;
          res.status(200).json({
            user: { id, name, email },
          });
        });

      res.status(200).json({ success: true });
    } else {
      res.status(403).json({ message: "unauthenticated", failed: true });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
