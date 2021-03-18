const express = require("express");
const router = express.Router();

const { isAuth } = require("../middleware/authCheck");

const {
  createTicket,
  unissuedTickets,
  openTickets,
  completedTickets,
  convertTicket,
  all,
  complete,
  transfer,
  updateJob,
  saveFile
} = require("../controller/ticket");

router.route("/createTicket").post(isAuth, createTicket);

router.route("/unissuedTickets").get(isAuth, unissuedTickets);

router.route("/openedTickets").get(isAuth, openTickets);

router.route("/completedTickets").get(isAuth, completedTickets);

router.route("/convertTicket").put(isAuth, convertTicket);

router.route("/all").get(isAuth, all);

router.route("/complete/:id").post(isAuth, complete);

router.route("/transfer").post(isAuth, transfer);

router.route("/update").put(isAuth, updateJob);

router.route("/uploadFile").post(isAuth, saveFile);

module.exports = router;
