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
      await prisma.notes.upsert({
        data: {
          title,
          note: markdown,
          userId: Number(session.id), // unsure if can be replaced by a connect statement
        },
      });

      res.status(200).json({ success: true });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
