const url = process.env.MONGO_URI_DEV;

const TicketSchema = mongoose.model("TicketSchema");
const File = mongoose.model("file");

const express = require("express");
const mongoose = require("mongoose");

module.exports = (upload) => {
  const connect = mongoose.createConnection(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  let gfs;

  connect.once("open", () => {
    // initialize stream
    gfs = new mongoose.mongo.GridFSBucket(connect.db, {
      bucketName: "uploads",
    });
  });

  uploadRouter.route("/").post(upload.single("file"), (req, res) => {
    console.log(req.body, req.file, req.data);
    try {
      // check for existing files
      File.findOne({ caption: req.body.filename }).then((file) => {
        console.log(file);
        if (file) {
          return res.status(200).json({
            success: false,
            message: "Image already exists",
          });
        }
        let newFile = new File({
          filename: req.file.filename,
          user: req.user._id,
          ticket: req.params.id,
        });

        newFile
          .save()
          .then((file) => {
            res.status(200).json({
              success: true,
              file,
            });
          })
          .catch((err) => res.status(500).json(err));
      });
    } catch (error) {}
  });
};
