const { prisma } = require("../../../../prisma/prisma");
const { PrismaClientKnownRequestError } = require("@prisma/client/runtime");

exports.getUserById = async (req, res) => {
  try {
    await prisma.user
      .findUnique({
        where: { id: Number(req.body._id) },
      })
      .then((user) => {
        res.json({ user, failed: false });
      });
  } catch (error) {
    res.status(404).json({ message: "User not found", error, failed: true });
  }
};
