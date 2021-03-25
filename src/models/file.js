const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

// Mongoose Schema for Tickets
const file = new mongoose.Schema(
  {
    user: { type: ObjectId, ref: "InternalUser", required: true },
    ticket: { type: ObjectId, ref: "ticketschemas" },
    filename: {
      required: true,
      type: String,
    },
    path: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

mongoose.model("file", file);
