const { prisma } = require("../../../../prisma/prisma");
const { PrismaClientKnownRequestError } = require("@prisma/client/runtime");

exports.edit = async (req, res) => {
  try {
    await prisma.user.update({
      where: { id: Number(req.body.id) },
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        isAdmin: req.body.role,
      },
    });
    return res.status(200).json({ message: "User Updated", failed: false });
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientKnownRequestError) {
      return res.status(422).json({ error: "User doesnt exist" });
    }
    return res.status(500).json({ message: error, failed: true });
  }
};
