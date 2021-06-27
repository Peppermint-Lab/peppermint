const { prisma } = require("../../../prisma/prisma");
const { PrismaClientKnownRequestError } = require("@prisma/client/runtime");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({})
    res.json({users, failed: false})
  } catch (error) {
    console.log(error);
    return res.status(422).json({ error, failed: true });
  }
};