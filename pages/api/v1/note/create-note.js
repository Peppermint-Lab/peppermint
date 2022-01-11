const { prisma } = require("../../../../prisma/prisma");

export default async function handler(req, res) {
  try {
    const { text, title } = req.body;
    if ((!text, !title)) {
      return res.status(422).json({ error: "Please add some text" });
    } else {

      await prisma.notes.create({
        data: {
          title,
          note: text,
          userId: Number(req.user.id), // unsure if can be replaced by a connect statement
        },
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
