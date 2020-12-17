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
  complete
} = require("../controller/ticket");

router.route("/createTicket").post(createTicket);

router.route("/unissuedTickets").get(auth, unissuedTickets);

router.route("/openedTickets").get(auth, openTickets);

router.route("/completedTickets").get(auth, completedTickets);

router.route("/convertTicket").put(auth, convertTicket);

router.route('/all').get(auth, all);

router.route('/complete/:id').post(auth, complete);

module.exports = router;
