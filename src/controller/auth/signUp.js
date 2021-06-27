const bcrypt = require("bcrypt");
const { prisma } = require("../../prisma/prisma");
// const { PrismaClientKnownRequestError } = require("@prisma/client/runtime");

exports.Signup = async (req, res) => {
    try {
      const { email, firstName, lastName, password } = req.body;
      const emailLower = email.toLowerCase();
      const hashed = bcrypt.hash(password, 10)
      if ((!email, !firstName, !lastName, !password)) {
        console.log('failed')
        return res.status(422).json({ error: "Please add all fields" });
      }
      try {
        await prisma.user.create({
          data: {
            firstName,
            lastName,
            email: emailLower,
            password: String(hashed),
            isAdmin: false,
          },
        });
        res
          .status(200)
          .json({ message: "User saved successfully", failed: false });
      } catch (error) {
        res.json({ error: "A user with that email already exists 😮", error });
        console.log(error)
        return;
      }
    } catch (error) {
      console.log(error);
      res.json({ message: error, failed: true });
    }
  };