const express = require("express");
const mongoose = require("mongoose");
const uploadRouter = express.Router();

const TicketSchema = mongoose.model("TicketSchema");
const File = mongoose.model("file");

const { isAuth } = require("../middleware/authCheck");

let url = null;

if (process.env.NODE_ENV === "production") {
  url = process.env.MONGO_URI_DOCKER;
} else {
  url = process.env.MONGO_URI_DEV;
}

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

  uploadRouter
    .route("/")
    .post(upload.single("file"), isAuth, (req, res, next) => {
      try {
        // check for existing files
        File.findOne({ filename: req.body.filename }).then((file) => {
          console.log(file);
          if (file) {
            return res.status(200).json({
              success: false,
              message: "Image already exists",
            });
          }
          let newFile = new File({
            filename: req.body.filename,
            user: req.user._id,
            ticket: req.body.ticket,
            fileId: mongoose.Types.ObjectId(req.file.id),
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

  // GET file linked to ticket
  uploadRouter.route("/files/:id").get((req, res, next) => {
    File.find({ ticket: mongoose.Types.ObjectId(req.params.id) }).then((files) => {
      res.status(200).json({
        success: true,
        files,
      });
    });
  });

  return uploadRouter;
};
