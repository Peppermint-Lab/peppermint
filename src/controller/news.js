const mongoose = require("mongoose");
const News = mongoose.model("news");

// Create a new newsletter
exports.create = async (req, res) => {
  try {
    const { title, text, active } = req.body;
    if ((!title, !text)) {
      return res.status(422).json({ error: "Please add all the fields" });
    } else {
      const newsletter = await new News({
        title,
        text,
        createdBy: req.user.id,
        active,
      });
      newsletter.save();
      res.status(200).json({ newsletter });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ failed: true, message: "Failed to create " });
  }
};

// Get All newsletters
exports.getNewsletters = async (req, res) => {
  try {
    const newsletters = await News.find().populate("createdBy", "_id name");
    return res.status(200).json({ newsletters });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ failed: true, message: "Failed to get newsletters " });
  }
};

// Change status of Newsletter
exports.updateStatus = async (req, res) => {
  try {
    await News.findByIdAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          title: req.body.title,
          text: req.body.text,
          active: req.body.active,
        },
      },
      { new: true }
    ).exec();
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ failed: true, message: "Failed to update " });
  }
};

// Delete newsletter
exports.deleteN = async (req, res) => {
  console.log(req.params.id)
  try {
    await News.findByIdAndDelete({ _id: req.params.id });
    const newsletters = await News.find().populate("createdBy", "_id name");
    res.status(200).json({ newsletters });
  } catch (error) {
    console.log(error);
    res.status(500).json({ failed: true, message: "Failed to delete " });
  }
};
