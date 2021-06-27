const fs = require("fs");
const { prisma } = require("../../../prisma/prisma");
const { PrismaClientKnownRequestError } = require("@prisma/client/runtime");

exports.deleteFile = async (req, res) => {
  const path = req.body.path;
  console.log(req.body);
  try {
    await prisma.file
      .delete({
        where: { id: Number(req.body.file) },
      })
      .then(() => {
        fs.unlink(path, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      });
    const files = await prisma.file.findMany({
      where: { userId: Number(req.user.id) },
    });
    res.status(200).json({ sucess: true, files, message: "File Deleted" });
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientKnownRequestError) {
      return res.status(404).json({ error: "File not found", success: false });
    }
    return res.status(500).json({ message: error, failed: true });
  }
};