const { prisma } = require("../../../../../prisma/prisma");

export default async function userProfile(req, res) {

  try {
    await prisma.user.update({
      where: { id: Number(req.body.id) },
      data: {
        name: req.body.name,
        email: req.body.email.toLowerCase(),
        language: req.body.language,
      },
    });

    await prisma.user.findUnique({
      where: { id: Number(req.body.id) },
    })
    .then((user) => {
      const { id, name, email, language } = user;
      res.status(200).json({
        user: { id, name, email, language },
      });
    });

    //return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }

}
