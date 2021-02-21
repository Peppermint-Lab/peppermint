const express = require("express");
const router = express.Router();

const {
  isAuth,
} = require("../middleware/authCheck");

const {
  create,
  getNewsletters,
  updateStatus,
  deleteN,
} = require("../controller/news");

router.route("/create").post(isAuth, create);

router.route("/get").get(isAuth, getNewsletters);

router.route("/update").put(isAuth, updateStatus);

router.route("/delete/:id").delete(isAuth, deleteN);

module.exports = router;
