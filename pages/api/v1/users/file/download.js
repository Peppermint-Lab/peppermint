const { prisma } = require("../../../../../prisma/prisma");
import { getSession } from "next-auth/react";
import fs from 'fs';
import path from 'path';

export default async function listFiles(req, res) {
  const session = await getSession({ req });

  const { filepath } = req.query
  
  try {

    console.log(filepath)

    const Buffer = fs.createReadStream(filepath);

    await new Promise(function(resolve) {
      // res.setHeader('Content-Type', 'image/svg+xml');
      Buffer.pipe(res);
      Buffer.on('end', resolve);
      Buffer.on('error', function(err) {
        if (err.code === 'ENOENT') {
          res.status(400).json({
            error: true,
            message: 'Sorry we could not find the file you requested!'
          });
          res.end();
        } else {
          res
            .status(500)
            .json({ error: true, message: 'Sorry, something went wrong!' });
          res.end();
        }
      });
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error, failed: true });
  }
}
