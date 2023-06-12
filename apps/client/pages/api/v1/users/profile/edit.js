const { prisma } = require("../../../../../prisma/prisma");
import { getSession } from "next-auth/react";

export default async function userProfile(req, res) {
  const session = await getSession({ req });

  try {
    if (session) {
      await prisma.user.update({
        where: { id: Number(req.body.id) },
        data: {
          name: req.body.name,
          email: req.body.email.toLowerCase(),
          language: req.body.language,
        },
      });

      await prisma.user
        .findUnique({
          where: { id: Number(req.body.id) },
        })
        .then((user) => {
          const { id, name, email, language } = user;
          res.status(200).json({
            user: { id, name, email, language },
          });
        });
    } else {
      res.status(403).json({ message: "unauthenticated", failed: true });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
