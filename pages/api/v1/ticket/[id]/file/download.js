import fs from "fs";

export default async function downloadFile(req, res) {
  const { filepath } = req.query;

  try {
    const Buffer = fs.createReadStream(filepath);

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
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error, failed: true });
  }
}
