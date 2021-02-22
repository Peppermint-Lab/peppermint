const express = require("express");
const router = express.Router();

const {
  isAuth,
  isAdmin
} = require("../middleware/authCheck");

const {
  create,
  getNewsletters,
  updateStatus,
  deleteN,
  getActiveNewsletters
} = require("../controller/news");

router.route("/create").post(isAuth, isAdmin, create);

router.route("/get").get(isAuth, getNewsletters);

router.route("/get/active").get(isAuth, getActiveNewsletters);

router.route("/update").put(isAuth, isAdmin, updateStatus);

router.route("/delete/:id").delete(isAuth, isAdmin, deleteN);

module.exports = router;
