const express = require("express");
const router = express.Router();
const auth = require("../middleware/authCheck");

const { createLog, getLogById } = require("../controller/timeLog");

router.route("/createTime").post(auth, createLog);

router.route("/getLog/:id").get(auth, getLogById);

module.exports = router;
