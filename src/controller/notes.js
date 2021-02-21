const mongoose = require("mongoose");
const Note = mongoose.model("Notes");

exports.saveNote = async (req, res) => {
  try {
    const { text, title } = req.body;
    if ((!text, !title)) {
      return res.status(422).json({ error: "Please add some text" });
    } else {
      const note = await new Note({
        title,
        note: text,
        createdBy: req.user._id,
      });
      note.save();
      res.status(200).json({
        note,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getNotes = async (req, res) => {
  try {
    await Note.find({ createdBy: req.user._id })
      .populate("createdBy", "_id name")
      .then((note) => {
        res.status(200).json({ note });
      });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await new mongoose.Types.ObjectId(req.params.id);
    if (!note) {
      return res.status(404).json({
        success: false,
        error: "Note not found.",
      });
    }
    await Note.findByIdAndDelete({ _id: req.params.id });
    return res.status(201).json({
      data: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

exports.updateNote = async (req, res) => {
  console.log(req.body);
  try {
    await Note.findByIdAndUpdate(
      { _id: req.body.id },
      { $set: { note: req.body.note } },
      { new: true }
    ).exec();
    console.log("Updated Note");
    res.status(201).json({ success: true, message: "Note Updated" });
  } catch (error) {
    console.log(error);
  }
};
