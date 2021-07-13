const express = require("express");
const router = express.Router();

const { Add } = require('../controller/uptime/add')
const { GetAll } = require('../controller/uptime/getAll')

router.route("/add").post(Add);
router.route("/getAll").get(GetAll);

module.exports = router;

