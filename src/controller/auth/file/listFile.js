const { prisma } = require("../../../prisma/prisma");

exports.listFile = async (req, res) => {
  try {
    const files = await prisma.file.findMany({
      where: { userId: Number(req.user.id) },
    });
    res.status(200).json({ sucess: true, files });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error, failed: true });
  }
};