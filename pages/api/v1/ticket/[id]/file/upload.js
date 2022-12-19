const { prisma } = require("../../../../../../prisma/prisma");

import { getSession } from "next-auth/react";
import { IncomingForm } from "formidable";
import fs from "fs";
import { createNecessaryDirectoriesSync } from "filesac";
const { S3Client } = require("@aws-sdk/client-s3");
const { PutObjectCommand } = require("@aws-sdk/client-s3");

export const config = {
  api: {
    bodyParser: false,
  },
};

const bucket = "peppermint";

export default async function UploadFile(req, res) {
  const session = await getSession({ req });

  const { id } = req.query;

  try {
    if (session.user) {
      const form = new IncomingForm({
        uploadDir: `./storage`,
        keepExtensions: true,
      });

      const filesystem = process.env.ACCESS_KEY !== undefined ? "s3" : "fs";

      form.parse(req, async (err, fields, files) => {
        const f = files.file;

        if (filesystem === "s3") {
          const upload = "./storage/" + f.newFilename;

          const s3Client = new S3Client({
            credentials: {
              accessKeyId: process.env.ACCESS_KEY,
              secretAccessKey: process.env.SECRET_KEY,
            },
            endpoint: "http://127.0.0.1:9000",
            forcePathStyle: true,
            region: "eu-west-2",
          });

          await s3Client
            .send(
              new PutObjectCommand({
                Bucket: bucket,
                Key: f.newFilename,
                Body: fs.readFileSync(upload),
              })
            )
            .then(async (response) => {
              console.log("Successfully uploaded file:", response);
              try {
                await prisma.ticketFile
                  .create({
                    data: {
                      filename: f.originalFilename,
                      ticketId: Number(id),
                      path: `peppermint/${f.newFilename}`,
                    },
                  })
                  .then((err) => console.log(err));
                return res
                  .status(200)
                  .json({ message: "File Uploaded", success: true });
              } catch (error) {
                console.log(error);
                return res.status(500).json({ message: error, success: false });
              }
            })
            .catch((err) => console.log("Error uploading file:", err));
        } else {
          const uploadPath = `./storage/tickets/${id}`;
          await createNecessaryDirectoriesSync(`${uploadPath}/x`);

          const u = `${uploadPath}/${f.originalFilename}`;

          fs.rename(`./storage/${f.newFilename}`, u, async function (err) {
            if (err) throw err;
            console.log("Successfully renamed - AKA moved!");

            try {
              await prisma.ticketFile
                .create({
                  data: {
                    filename: f.originalFilename,
                    ticketId: Number(id),
                    path: u,
                  },
                })
                .then((err) => console.log(err));
              return res
                .status(200)
                .json({ message: "File Uploaded", success: true });
            } catch (error) {
              console.log(error);
              return res.status(500).json({ message: error, success: false });
            }
          });
        }
      });
    } else {
      return res
        .status(403)
        .json({ message: "Not authorized", success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
