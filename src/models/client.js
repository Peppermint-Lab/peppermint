const mongoose = require("mongoose");
// const { ObjectId } = mongoose.Schema.Types;

const ClientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String}, 
    contactName: { type: String },
    number: { type: Number },
    notes: { type: String }
}, {timestamps: true});

mongoose.model("Clients", ClientSchema);