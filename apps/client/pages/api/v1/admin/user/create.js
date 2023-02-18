const { prisma } = require("../../../../../prisma/prisma");
import { getSession } from "next-auth/react";
import bcrypt from "bcrypt";

export default async function createUser(req, res) {
  const session = await getSession({ req });
  const { email, password, name, admin } = req.body;
  const e = email.toLowerCase();

  try {
    if (session.user.isAdmin) {
      const hash = await bcrypt.hash(password, 10);

      await prisma.user.create({
        data: {
          name,
          email: e,
          password: hash,
          isAdmin: admin,
        },
      });
      res
        .status(200)
        .json({ message: "User saved successfully", failed: false });
    } else {
      res.status(400).json({ message: "You are not an admin ", success: true });
    }
  } catch (error) {
    console.log(error);
  }
}
