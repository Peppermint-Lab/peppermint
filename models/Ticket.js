const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

// Mongoose Schema for Tickets
const TicketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: ObjectId, required: true, ref: "Clients" },
  issue: { type: String, required: true },
  email: { type: String, required: false },
  note: { type: String },
  status: {
    type: String,
    enum: ["issued", "unissued", "completed"],
    default: "unissued",
  },
  assignedto: { type: ObjectId, ref: "InternalUser" },
  priority: {
    type: String,
    enum: ["Low", "Normal", "High"],
    default: "Normal",
  },
}, {timestamps: true});

mongoose.model("TicketSchema", TicketSchema);
