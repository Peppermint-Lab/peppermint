const { prisma } = require("../../../../../prisma/prisma");

import { getSession } from "next-auth/react";
import { IncomingForm } from "formidable";
import fs from "fs";
import { createNecessaryDirectoriesSync } from "filesac";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function UploadFile(req, res) {
  const session = await getSession({ req });

  const uploadPath = `./storage/${session.id}`;
  await createNecessaryDirectoriesSync(`${uploadPath}/x`);

  try {
    const form = new IncomingForm({
      uploadDir: `./storage`,
      keepExtensions: true,
    });

    form.parse(req, (err, fields, files) => {
      const f = files.file;

      const u = `./storage/${session.id}/${f.originalFilename}`;

      fs.rename(`./storage/${f.newFilename}`, u, async function (err) {
        if (err) throw err;
        console.log("Successfully renamed - AKA moved!");

        try {
          await prisma.userFile
            .create({
              data: {
                filename: f.originalFilename,
                userId: Number(session.id),
                path: u,
              },
            })
            .then((err) => console.log(err));

          return res.status(200).json({ message: "File Uploaded", success: true });
        } catch (error) {
          console.log(error);
          return res.status(500).json({ error, success: false });
        }
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
