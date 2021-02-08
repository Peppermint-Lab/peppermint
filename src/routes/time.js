const express = require("express");
const router = express.Router();
const auth = require("../middleware/authCheck");

const { createLog, getLogById, deleteLog } = require("../controller/timeLog");

router.route("/createTime").post(auth, createLog);

router.route("/getLog/:id").get(auth, getLogById);

router.route("/deleteLog/:id").delete(auth, deleteLog);

module.exports = router;
