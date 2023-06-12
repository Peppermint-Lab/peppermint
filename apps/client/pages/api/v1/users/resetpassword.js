const { prisma } = require("../../../../prisma/prisma");
import bcrypt from "bcrypt";
import { getSession } from "next-auth/react";

/**
 * @swagger
 * /api/v1/users/resetpassword:
 *   post:
 *     tags: [users]
 *     description: Takes password and ID in the body and resets a users password
 *     responses:
 *       200:
 *         description: Password updated correctly
 */

export default async function handler(req, res) {
  const session = await getSession({ req });
  const { password, id } = req.body;

  try {
    if (session) {
      const hashedPass = await bcrypt.hash(password, 10);
      await prisma.user.update({
        where: { id: id },
        data: {
          password: hashedPass,
        },
      });
      res.status(201).json({ message: "Password updated!", failed: false });
    } else {
      res.status(403).json({ message: "unauthenticated", failed: true });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
