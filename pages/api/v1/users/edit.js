const { prisma } = require("../../../../../prisma/prisma");

export default async function getAllClients(req, res) {
  try {
    await prisma.user.update({
      where: { id: Number(req.body.id) },
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        isAdmin: req.body.role,
      },
    });
    return res.status(200).json({ message: "User Updated", failed: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
