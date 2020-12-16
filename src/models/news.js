const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types


// Mongoose Schema for internal_users
const news = new mongoose.Schema({
    title: {type: String},
    text: {type: String },
    createdBy: { type: ObjectId, ref: 'InternalUser'},
    active: { type: Boolean,  enum: [true, false], default: false }
  }, { timestamps: true });
  
  mongoose.model("news", news);