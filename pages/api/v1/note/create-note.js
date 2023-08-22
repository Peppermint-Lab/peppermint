const { prisma } = require("../../../../prisma/prisma");
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  const markdown = req.body.value;
  const title = req.body.title;

  try {
    if ((!markdown, !title)) {
      return res.status(422).json({ error: "Please add some text" });
    } else {
      const data = await prisma.notes.create({
        data: {
          title,
          note: markdown,
          userId: Number(session.user.id), // unsure if can be replaced by a connect statement
        },
      });

      const { id } = data;

      res.status(200).json({ success: true, id });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
