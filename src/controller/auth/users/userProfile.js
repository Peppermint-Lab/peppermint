const { prisma } = require("../../../prisma/prisma");
const { PrismaClientKnownRequestError } = require("@prisma/client/runtime");

exports.userProfile = async (req, res) => {
  const emailLower = req.body.email.toLowerCase();
  try {
    await prisma.user.update({
      where: { id: Number(req.body.id) },
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
          message: "User updated",
          user: { id, name, email },
          fail: false,
        });
      });
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientKnownRequestError) {
      return res.status(422).json({ error: "User doesnt exist" });
    }
    return res.status(500).json({ message: error, fail: true });
  }
};