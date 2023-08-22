const { prisma } = require("../../../../../prisma/prisma");
import fs from "fs";

export default async function deleteFile(req, res) {
  const { path, id } = req.body;

  try {
    await prisma.userFile
      .delete({
        where: { id: Number(id) },
      })
      .then(() => {
        fs.unlink(path, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      });

    res.status(200).json({ sucess: true, message: "File Deleted" });
  } catch (error) {
      console.log(error)
      res.status(500).json({})
  }
}
