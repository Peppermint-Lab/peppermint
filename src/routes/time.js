const express = require("express");
const router = express.Router();
const auth = require("../middleware/authCheck");

const { createLog } = require("../controller/timeLog");

router.route("/createTime").post(auth, createLog);

module.exports = router;
