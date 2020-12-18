const express = require("express");
const router = express.Router();
const auth = require("../middleware/authCheck");

const {
  create,
  getNewsletters,
  updateStatus,
  deleteN,
} = require("../controller/news");

router.route("/create").post(auth, create);

router.route("/get").get(auth, getNewsletters);

router.route("/update").put(auth, updateStatus);

router.route("/delete/:id").delete(auth, deleteN);

module.exports = router;
