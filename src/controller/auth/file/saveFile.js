const { prisma } = require("../../../prisma/prisma");

exports.saveFile = async (req, res) => {
  const file = req.files.file;
  const uploadPath = "files/" + `${req.user.id}/` + file.name;

  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    } else {
      prisma.file
        .create({
          data: {
            filename: file.name,
            userId: Number(req.user.id),
            path: uploadPath,
          },
        })
        .then(() => {
          file.mv(uploadPath, function (err) {
            if (err) {
              return res.status(500).json({ sucess: false, err });
            }
            return res
              .status(200)
              .json({ sucess: true, message: "File Uploaded!" });
          });
        });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};