const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

// Mongoose Schema for Tickets
const file = new mongoose.Schema(
  {
    user: { type: ObjectId, ref: "InternalUser" },
    ticket: { type: ObjectId, ref: "ticketschemas" },
    filename: {
      required: true,
      type: String,
    },
    fileId: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

mongoose.model("file", file);
