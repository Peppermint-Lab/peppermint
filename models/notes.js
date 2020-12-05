const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

// Mongoose Schema for internal_users notes
const Notes = new mongoose.Schema({
    title: {type: String},
    note: {type: String },
    createdBy: { type: ObjectId, ref: 'InternalUser'},
  }, {timestamps: true});
  
  mongoose.model("Notes", Notes);