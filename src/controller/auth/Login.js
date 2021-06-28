const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { prisma } = require("../../../prisma/prisma");
// const { PrismaClientKnownRequestError } = require("@prisma/client/runtime");

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailLower = email.toLowerCase();
    if (!email || !password) {
      return res
        .status(422)
        .json({ error: "please add email or password", auth: false });
    }
    const user = await prisma.user.findUnique({
      where: { email: emailLower },
    });
    if (user && bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        {
          email: user.email,
          id: user.id,
          role: user.isAdmin,
          time: new Date(),
        },
        process.env.JWT_SECRET
      );
      res.cookie("token", token, {
        maxAge: 1000 * 60 * 60 * 12,
        sameSite: true,
      });
      res.status(200).json({
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isAdmin: user.isAdmin,
        },
        auth: true,
      });
    } else {
      res
        .status(500)
        .json({ message: "Unable to process request", auth: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to process request", auth: false });
  }
};
