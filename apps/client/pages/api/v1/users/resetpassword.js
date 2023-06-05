const { prisma } = require("../../../../prisma/prisma");
import bcrypt from "bcrypt";

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

export default async function getAllClients(req, res) {
  const { password, id } = req.body;

  try {
    const hashedPass = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { id: id },
      data: {
        password: hashedPass,
      },
    });
    res
      .status(201)
      .json({ message: "Password updated!", failed: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}