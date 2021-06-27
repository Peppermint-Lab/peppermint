const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { prisma } = require("../../prisma/prisma");
const { PrismaClientKnownRequestError } = require("@prisma/client/runtime");

exports.resetPasswordAdmin = async (req, res) => {
    const { password } = req.body;
    try {
      const hashedPass = await bcrypt.hash(password, 10);
      // update throws an exception if record not found, so
      // we can skip checking if user exists in this block
      await prisma.user.update({
        where: { id: Number(req.params.id) },
        data: {
          password: hashedPass,
        },
      });
      res
        .status(200)
        .json({ message: "Password reset successfully", failed: false });
    } catch (error) {
      console.log(error);
      if (error instanceof PrismaClientKnownRequestError) {
        return res.status(422).json({ error: "User doesnt exist" });
      }
      res.status(500).json({ message: error, failed: true });
    }
  };