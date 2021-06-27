
const { prisma } = require("../../../prisma/prisma");
const { PrismaClientKnownRequestError } = require("@prisma/client/runtime");


exports.deleteUser = async (req, res) => {
    try {
      await prisma.user.delete({
        where: { id: Number(req.params.id) },
      });
      return res.status(201).json({ message: "User deleted", fail: false });
    } catch (error) {
      console.log(error);
      if (error instanceof PrismaClientKnownRequestError) {
        return res.status(404).json({ error: "User not found", success: false });
      }
      return res.status(500).json({ message: error, failed: true });
    }
  };
  