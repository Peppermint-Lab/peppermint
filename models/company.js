const mongoose = require("mongoose");
// const { ObjectId } = mongoose.Schema.Types;

const ClientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    Contact: { type: String },
    Number: { type: Number }
}, {timestamps: true});

mongoose.model("Clients", ClientSchema);