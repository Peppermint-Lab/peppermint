const mongoose = require("mongoose");
const Ticket = mongoose.model("TicketSchema");
const Log = mongoose.model("Log");

exports.createLog = async (req, res) => {

    try {
        
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: 'There has been an error!'});
    }
}