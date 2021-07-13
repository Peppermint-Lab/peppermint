const express = require("express");
const router = express.Router();

const { Add } = require('../controller/uptime/add')

router.route("/add").post(Add);

module.exports = router;

