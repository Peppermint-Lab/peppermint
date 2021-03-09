const mongoose = require("mongoose");
const TicketSchema = mongoose.model("TicketSchema");
const User = mongoose.model("InternalUser");

exports.countUnissuedTickets = async (req, res) => {
  await TicketSchema.count({ status: "unissued" })
    .then((result) => {
      res.json({ result });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.countOpenedTickets = async (req, res) => {
  await TicketSchema.count({ status: "issued", assignedto: req.user._id })
    .then((result) => {
      res.json({ result });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.countCompletedTickets = async (req, res) => {
  await TicketSchema.count({ status: "completed", assignedto: req.user._id })
    .then((result) => {
      res.json({ result });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.countAllOpenedTickets = async (req, res) => {
  await TicketSchema.count({ status: "issued" })
    .then((result) => {
      res.json({ result });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.countAllCompletedTickets = async (req, res) => {
  await TicketSchema.count({ status: "completed" })
    .then((result) => {
      res.json({ result });
    })
    .catch((err) => {
      console.log(err);
    });
};
