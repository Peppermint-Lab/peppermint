const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

// Mongoose Schema for Tickets
const TicketSchema = new mongoose.Schema(
  {
    ticketId: { type: String },
    name: { type: String, required: true },
    client: { type: ObjectId, ref: "Clients" },
    issue: { type: String, required: true },
    email: { type: String,},
    note: { type: String },
    Log: { type: ObjectId, ref: "Log" },
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
  },
  { timestamps: true }
);

mongoose.model("TicketSchema", TicketSchema);
