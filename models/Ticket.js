const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

// Mongoose Schema for Tickets
const TicketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String, required: true },
  issue: { type: String, required: true },
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
  time: { type: Date },
});

mongoose.model("TicketSchema", TicketSchema);
