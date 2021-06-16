const express = require("express");
const router = express.Router();

const {
  isAuth,
} = require("../middleware/authCheck");

const {
  countUnissuedTickets,
  countOpenedTickets,
  countCompletedTickets,
  countAllOpenedTickets,
  countAllCompletedTickets
} = require("../controller/data");

router.route("/unallocatedTickets").get(isAuth, countUnissuedTickets);

router.route("/openTickets").get(isAuth, countOpenedTickets);

router.route("/completedTickets").get(isAuth, countCompletedTickets);

router.route("/getallopen").get(isAuth, countAllOpenedTickets);

router.route("/getallcompleted").get(isAuth, countAllCompletedTickets);

module.exports = router;
