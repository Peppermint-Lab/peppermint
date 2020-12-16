const mongoose = require("mongoose");
const TicketSchema = mongoose.model("TicketSchema");

// Get Open Tickets
exports.openTickets = async (req, res) => {
  // console.log("Open Tickets API HIT")

  try {
    await TicketSchema.find({ status: "issued", assignedto: req.user._id })
      .populate("client", "_id name")
      .then((tickets) => {
        res.json({ tickets });
      });
  } catch (error) {
    console.log(error);
    return res.status(404);
  }
};

// Get unIssued Tickets
exports.unissuedTickets = async (req, res) => {
  // console.log("Unissued ticket API HIT")
  try {
    await TicketSchema.find({ status: "unissued" })
      .populate("client", "_id name")
      .then((tickets) => {
        res.json({ tickets });
      });
    return res.status(200);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

exports.completedTickets = async (req, res) => {
  // console.log("Unissued ticket API HIT")
  try {
    await TicketSchema.find({
      status: "completed",
      assignedto: req.user._id,
    }).then((tickets) => {
      res.json({ tickets });
    });
    return res.status(200);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

// Create a new ticket
exports.createTicket = async (req, res) => {
  console.log("Create a new ticket API HIT");
  try {
    const { name, company, issue, priority, email } = req.body;
    if (!name || !company || !issue || !priority) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    const newTicket = await new TicketSchema({
      name,
      client: mongoose.Types.ObjectId(company),
      issue,
      priority,
      email,
    });
    newTicket.save().then((result) => {
      res.json({ newTicket: result });
    });
    return res.status(200);
  } catch (error) {
    console.log(error);
  }
};

// Convert a ticket
exports.convertTicket = async (req, res) => {
  const { data } = req.body;
  const t = data["0"]._id;

  try {
    await TicketSchema.findByIdAndUpdate(
      { _id: t },
      {
        $set: { status: "issued", assignedto: req.user._id },
      },
      {
        new: true,
      }
    ).exec();
    console.log("Updated record");
  } catch (error) {
    console.log(error);
  }
};

exports.all = async (req, res) => {
  try {
    const tickets = await TicketSchema.find()
    .populate("client", "_id name")
    .populate('assignedto', '_id name')
    .then((tickets) => {
      res.status(200).json({tickets});
    })
  } catch (error) {
    console.log(error)
    res.status(500)
  }
}
