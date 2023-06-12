const { prisma } = require("../../../../../prisma/prisma");
import fs from "fs";
import { getSession } from "next-auth/react";

export default async function deleteFile(req, res) {
  const { id } = req.body;
  const session = await getSession({ req });

  try {
    if (session) {
      await prisma.userFile
        .delete({
          where: { id: id },
        })
        .then((userFile) => {
          fs.unlink(userFile, (err) => {
            if (err) {
              console.error(err);
              return;
            }
          });
        });

      res.status(200).json({ sucess: true, message: "File Deleted" });
    } else {
      res.status(403).json({ message: "unauthenticated", failed: true });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({});
  }
}
