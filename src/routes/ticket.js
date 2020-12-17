const express = require("express");
const router = express.Router();
const auth = require("../middleware/authCheck");

const {
  createTicket,
  unissuedTickets,
  openTickets,
  completedTickets,
  convertTicket,
  all,
  filter
} = require("../controller/ticket");

router.route("/createTicket").post(createTicket);

router.route("/unissuedTickets").get(auth, unissuedTickets);

router.route("/openedTickets").get(auth, openTickets);

router.route("/completedTickets").get(auth, completedTickets);

router.route("/convertTicket").put(auth, convertTicket);

router.route('/all').get(auth, all);

router.route('/filter').post(auth, filter);

module.exports = router;
