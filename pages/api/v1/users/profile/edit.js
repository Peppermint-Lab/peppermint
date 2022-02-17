const { prisma } = require("../../../../../prisma/prisma");


export default async function userProfile(req, res) {
  const emailLower = req.body.email.toLowerCase();

  const { id } = req.body.id;

  try {
    await prisma.user.update({
      where: { id: Number(req.body.id) },
      data: {
        name: req.body.name,
        email: emailLower,
      },
    });

    await prisma.user.findUnique({
      where: { id: Number(req.body.id) },
    })
    .then((user) => {
      const { id, name, email } = user;
      console.log(user);
      res.status(200).json({
        user: { id, name, email },
      });
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
