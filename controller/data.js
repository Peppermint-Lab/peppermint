const mongoose = require("mongoose");
const TicketSchema = mongoose.model("TicketSchema");
const session = require('express-session');


exports.countUnissuedTickets = async (req, res) => {
  // console.log("Data api HIT")
  await TicketSchema.count({ status: "unissued" })
    .then((result) => {
      res.json({ result });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.countOpenedTickets = async (req, res) => {
  // console.log("Data api HIT")
  await TicketSchema.count({ status: "issued", assignedto: req.user._id })
    .then((result) => {
      res.json({ result });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.countCompletedTickets = async (req, res) => {
  // console.log("Data api HIT")
  await TicketSchema.count({ status: "completed", assignedto: req.user._id })
    .then((result) => {
      res.json({ result });
    })
    .catch((err) => {
      console.log(err);
    });
};
