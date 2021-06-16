const express = require("express");
const router = express.Router();

const {
    isAuth,
} = require("../middleware/authCheck");

const {
    createLog,
    getLogById,
    deleteLog
} = require("../controller/timeLog");

router.route("/createTime").post(isAuth, createLog);

router.route("/getLog/:id").get(isAuth, getLogById);

router.route("/deleteLog/:id").delete(isAuth, deleteLog);

module.exports = router;
