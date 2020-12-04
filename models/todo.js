const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

// Mongoose Schema for users

const TodoSchema = new mongoose.Schema({
   text: {type: String},
   done: {type: Boolean, enum: [true, false], default: false},
   createdBy: { type: ObjectId, ref: 'InternalUser'}
}, { timestamps: true })

mongoose.model("Todo", TodoSchema)