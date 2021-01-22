const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

// Mongoose Schema for Tickets
const Log = new mongoose.Schema(
  {
    user: { type: ObjectId, ref: "InternalUser" },
    ticket: { type: ObjectId, ref: "ticketschemas"}, 
    stime: { type: Number },
    etime: { type: Number },
    activity: { type: String }
  },
  { timestamps: true }
);

mongoose.model("Log", Log);
