const mongoose = require("mongoose");
const Log = mongoose.model("Log");

exports.createLog = async (req, res) => {
  try {
    const { ticket, date, time, activity } = req.body;
    if (!ticket || !date || !time || !activity) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    const log = await new Log({
      ticket: mongoose.Types.ObjectId(ticket),
      date,
      time,
      activity,
      user: req.user._id,
    });
    log.save().then(() => {
      res.status(201).json({ message: "TimeLog added correctly" });
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "There has been an error!" });
  }
};

exports.getLogById = async (req, res) => {
  try {
    const log = await Log.find({ ticket: mongoose.Types.ObjectId(req.params.id) }).populate(
      "user",
      "_id name"
    );
    res.status(200).json({ log });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "There has been an error!" });
  }
};
