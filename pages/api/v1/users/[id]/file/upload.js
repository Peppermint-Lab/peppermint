const { prisma } = require("../../../../../../prisma/prisma");

import { getSession } from "next-auth/react";
import { IncomingForm } from "formidable";
import fs from 'fs'
import {createNecessaryDirectoriesSync} from "filesac";


export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function UploadFile(req, res) {
  const session = await getSession({ req });
  const { id } = req.query;

  const uploadPath = `./storage/${id}`;
  await createNecessaryDirectoriesSync(`${uploadPath}/x`);

  try {

    // const data = await new Promise((resolve, reject) => {
    //   const form = new IncomingForm();
    //   form.parse(req, (err, fields, files) => {
    //     if (err) return reject(err);
    //     resolve({ fields, files });
    //   });
    // });


    const form = new IncomingForm({
      uploadDir: `./storage`,
      keepExtensions: true 
    })

    form.parse(req, (err, fields, files) => {
      console.log(files);
    });

    // const i = data.files.file

    // const d = `storage/${session.id}/${i.originalFilename}`;
 

    return res.status(201).json({ message: "File Uploaded", fail: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
