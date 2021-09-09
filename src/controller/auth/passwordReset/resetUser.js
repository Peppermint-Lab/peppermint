const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { prisma } = require("../../../../prisma/prisma");
const { PrismaClientKnownRequestError } = require("@prisma/client/runtime");

exports.resetPasswordUser = async (req, res) => {
  const { password } = req.body;
  try {
    const hashedPass = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: {
        password: hashedPass,
      },
    });
    res
      .status(201)
      .json({ message: "password updated success", failed: false });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return res.status(422).json({ error: "User doesnt exist" });
    }
    res.status(500).json({ message: error, failed: true });
  }
};