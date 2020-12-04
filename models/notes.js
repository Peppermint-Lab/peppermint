const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

// Mongoose Schema for internal_users notes
const InternalUserSchema = new mongoose.Schema({
    note: {type: string },
    createdBy: { type: ObjectId, ref: 'InternalUser'},
  }, {timestamps: yes});
  
  mongoose.model("InternalUser", InternalUserSchema);