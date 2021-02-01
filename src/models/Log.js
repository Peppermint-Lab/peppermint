const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

// Mongoose Schema for Tickets
const Log = new mongoose.Schema(
  {
    user: { type: ObjectId, ref: "InternalUser" },
    ticket: { type: ObjectId, ref: "ticketschemas"}, 
    time: { type: String },
    date: { type: String },
    activity: { type: String }
  },
  { timestamps: true }
);

mongoose.model("Log", Log);
