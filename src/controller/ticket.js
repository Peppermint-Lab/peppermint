const mongoose = require("mongoose");
const TicketSchema = mongoose.model("TicketSchema");
const File = mongoose.model("file");
const fs = require("fs");

// Get by ID
exports.getTicketById = async (req, res) => {
  try {
    await TicketSchema.findById({ _id: req.params.id })
      .populate("client", "_id name number")
      .populate("assignedto", "_id name")
      .then((ticket) => {
        res.json({ ticket });
      });
  } catch (error) {
    console.log(error);
    return res.status(404);
  }
}

// Get Open Tickets
exports.openTickets = async (req, res) => {
  try {
    await TicketSchema.find({ status: "issued", assignedto: req.user._id })
      .populate("client", "_id name number")
      .populate("assignedto", "_id name")
      .then((tickets) => {
        res.json({ tickets });
      });
  } catch (error) {
    console.log(error);
    return res.status(404);
  }
};

// Get unIssued Tickets
exports.unissuedTickets = async (req, res) => {
  try {
    await TicketSchema.find({ status: "unissued" })
      .populate("client", "_id name")
      .then((tickets) => {
        res.status(200).json({ tickets });
      });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

exports.completedTickets = async (req, res) => {
  try {
    await TicketSchema.find({
      status: "completed",
      assignedto: req.user._id,
    }).then((tickets) => {
      res.json({ tickets });
    });
    return res.status(200);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

// Create a new ticket
exports.createTicket = async (req, res) => {
  console.log(req.body);
  try {
    const { name, company, issue, priority, email } = req.body;
    if (!name || !company || !issue || !priority) {
      return res.status(422).json({ error: "Please add all the fields", failed: true });
    }
    const ticket = await new TicketSchema({
      name,
      client: mongoose.Types.ObjectId(company),
      issue,
      priority,
      email,
    });
    ticket.save().then(() => {
      res.status(201).json({ message: "Ticket created correctly", ticket });
    });
  } catch (error) {
    console.log(error);
  }
};

// Convert a ticket
exports.convertTicket = async (req, res) => {
  const { data } = req.body;
  const t = data._id;

  try {
    await TicketSchema.findByIdAndUpdate(
      { _id: t },
      {
        $set: { status: "issued", assignedto: req.user._id },
      },
      {
        new: true,
      }
    ).exec();
    const ticket = await TicketSchema.find({ status: "unissued" }).populate(
      "client",
      "_id name"
    );
    return res.status(201).json({
      ticket,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.all = async (req, res) => {
  try {
    await TicketSchema.find()
      .populate("client", "_id name")
      .populate("assignedto", "_id name")
      .then((tickets) => {
        res.status(200).json({ tickets });
      });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

exports.complete = async (req, res) => {
  try {
    await TicketSchema.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: { status: "completed" },
      },
      {
        new: true,
      }
    ).exec();
    const tickets = await TicketSchema.find({
      status: "issued",
      assignedto: req.user._id
    })
      .populate("client", "_id name")
      .populate("assignedto", "_id name");
    res.status(200).json({ tickets });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

exports.unComplete = async (req, res) => {
  try {
    await TicketSchema.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: { status: "issued", assignedto: req.user._id },
      },
      {
        new: true,
      }
    ).exec();
    const tickets = await TicketSchema.find({
      status: "issued",
      assignedto: req.user._id,
    })
      .populate("client", "_id name")
      .populate("assignedto", "_id name");
    res.status(200).json({ tickets });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
}

exports.transfer = async (req, res) => {
  try {
    await TicketSchema.findByIdAndUpdate(
      { _id: req.body.find },
      {
        $set: { assignedto: mongoose.Types.ObjectId(req.body.id) },
      },
      {
        new: true,
      }
    ).exec();
    const tickets = await TicketSchema.find({
      status: "issued",
      assignedto: req.user._id,
    })
      .populate("client", "_id name")
      .populate("assignedto", "_id name");
    res.status(200).json({ tickets });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

exports.updateJob = async (req, res) => {
  try {
    await TicketSchema.findByIdAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          issue: req.body.issue,
          note: req.body.note,
          name: req.body.name,
          email: req.body.email,
          number: req.body.number,
        },
      },
      {
        new: true,
      }
    ).exec();
    res.status(201).json({ success: true, message: "Ticket saved" });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

exports.saveFile = async (req, res) => {
  const file = req.files.file;
  const uploadPath = "files/" + `${req.params.id}/` + file.name;
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    } else {
      const newFile = new File({
        filename: file.name,
        user: req.user._id,
        ticket: req.params.id,
        path: uploadPath,
      });
      newFile.save().then(() => {
        file.mv(uploadPath, function (err) {
          if (err) {
            return res.status(500).json({ sucess: false, err });
          }
          return res
            .status(200)
            .json({ sucess: true, message: "File Uploaded!" });
        });
      });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error })
  }
};

exports.listFile = async (req, res) => {
  try {
    const files = await File.find({
      ticket: mongoose.Types.ObjectId(req.params.id),
    });
    res.status(200).json({ sucess: true, files });
  } catch (error) {}
};

exports.deleteFile = async (req, res) => {
  const path = req.body.path;
  try {
    await File.deleteOne({ _id: req.body.file }).then(() => {
      fs.unlink(path, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    });
    const files = await File.find({
      ticket: mongoose.Types.ObjectId(req.params.id),
    });
    res.status(200).json({ sucess: true, files, message: "File Deleted" });
  } catch (error) {}
};

exports.downloadFile = async (req, res) => {
  const filepath = req.body.filepath
  try {
    res.download(filepath, (err) => {
      if (err) console.log(err)
    }) 
  } catch (error) {
    console.log(error)
  }
};
