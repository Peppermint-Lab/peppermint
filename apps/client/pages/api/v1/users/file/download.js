import fs from "fs";
const { prisma } = require("../../../../../prisma/prisma");
import { getSession } from "next-auth/react";

export default async function listFiles(req, res) {
  const session = await getSession({ req });

  try {
    if(session) {
      const Buffer = fs.createReadStream(userFile.path);

    const { id } = req.query;

    const userFile = await prisma.userFile.findUnique({
      where: {
        id: Number(id),
      },
    });

    await new Promise(function (resolve) {
      Buffer.pipe(res);
      Buffer.on("end", resolve);
      Buffer.on("error", function (err) {
        if (err.code === "ENOENT") {
          res.status(400).json({
            error: true,
            message: "Sorry we could not find the file you requested!",
          });
          res.end();
        } else {
          res
            .status(500)
            .json({ error: true, message: "Sorry, something went wrong!" });
          res.end();
        }
      });
    });
    } else {
      res.status(403).json({ message: "unauthenticated", failed: true });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error, failed: true });
  }
}
