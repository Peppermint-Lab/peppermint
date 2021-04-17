// TODO models in Prisma do not have same fields as Mongoose models
const { prisma } = require ("../../prisma/prisma");
const fs = require("fs");

// Get by ID
exports.getTicketById = async (req, res) => {
  try {
    await prisma.ticket.findUnique({
      where: {
        id: Number(req.params.id)
      },
      include: {
        client: {
          select: { id: true, name: true, number: true }
        },
        assignedTo: {
          select: { id: true, firstName: true, lastName: true }
        }
      }
    }).then(ticket => {
      res.json({ ticket });
    })
  } catch (error) {
    console.log(error);
    return res.status(404);
  }
}

// Get Open Tickets
exports.openTickets = async (req, res) => {
  try {
    await prisma.ticket.findMany({
      where: { isIssued: true, userId: Number(req.user._id) },
      include: {
        client: {
          select: { id: true, name: true, number: true }
        },
        assignedTo: {
          select: { id: true, firstName: true, lastName: true }
        }
      }
    }).then((tickets) => {
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
    await prisma.ticket.findMany({
      where: { isUnissued: true },
      include: {
        client: {
          select: { id: true, name: true }
        }
      }
    }).then((tickets) => {
      res.status(200).json({ tickets });
    });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

exports.completedTickets = async (req, res) => {
  try {
    await prisma.ticket.findMany({
      where: { isComplete: true, userId: Number(req.user._id) }
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

    await prisma.ticket.create({
      data: {
        name,
        issue,
        priority,
        email,
        client: {
          connect: { id: Number(company) }
        }
      }
    }).then(ticket => {
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

    await prisma.ticket.update({
      where: { id: Number(t) },
      data: {
        isIssued: true, userId: Number(req.user._id)
      }
    });

    await prisma.ticket.findMany({
      where: {
        isIssued: false
      },
      include: {
        client: {
          select: { id: true, name: true }
        }
      }
    }).then(tickets => {
      res.status(201).json({
        tickets,
      });
    })
  } catch (error) {
    console.log(error);
  }
};

exports.all = async (req, res) => {
  try {
    await prisma.ticket.findMany({
      include: {
        client: {
          select: { id: true, name: true }
        },
        assignedTo: {
          select: { id: true, firstName: true, lastName: true }
        }
      }
    }).then(tickets => {
      res.status(200).json({ tickets });
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

exports.complete = async (req, res) => {
  try {
    await prisma.ticket.update({
      where: { id: Number(req.params.id) },
      data: {
        isComplete: true
      }
    });

    const tickets = await prisma.ticket.findMany({
      where: { isIssued: true, userId: Number(req.user._id) },
      include: {
        client: {
          select: { id: true, name: true }
        },
        assignedTo: {
          select: { id: true, firstName: true, lastName: true }
        }
      }
    });
    res.status(200).json({ tickets });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

exports.unComplete = async (req, res) => {
  try {
    await prisma.ticket.update({
      where: { id: Number(req.params.id) },
      data: {
        isComplete: true, isIssued: true, userId: Number(req.user._id)
      }
    });

    const tickets = await prisma.ticket.findMany({
      where: { isIssued: true, userId: Number(req.user._id) },
      include: {
        client: {
          select: { id: true, name: true }
        },
        assignedTo: {
          select: { id: true, firstName: true, lastName: true }
        }
      }
    });
    res.status(200).json({ tickets });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
}

exports.transfer = async (req, res) => {
  try {
    await prisma.ticket.update({
      where: { id: Number(req.body.find) },
      data: {
        assignedTo: {
          connect: { id: Number(req.body.id) }
        }
      }
    });

    const tickets = await prisma.ticket.findMany({
      where: { isIssued: true, userId: Number(req.user._id) },
      include: {
        client: {
          select: { id: true, name: true }
        },
        assignedTo: {
          select: { id: true, firstName: true, lastName: true }
        }
      }
    });
    res.status(200).json({ tickets });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

exports.updateJob = async (req, res) => {
  try {
    await prisma.ticket.update({
      where: { id: Number(req.body.find) },
      data: {
        assignedTo: {
          issue: req.body.issue,
          note: req.body.note,
        }
      }
    });
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
      await prisma.file.create({
        data: {
          filename: file.name,
          userId: req.user._id,
          path: uploadPath,
        }
      }).then(() => {
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
  // TODO File model needs Ticket
  try {
    const files = await File.find({
      ticket: mongoose.Types.ObjectId(req.params.id),
    });
    res.status(200).json({ sucess: true, files });
  } catch (error) { }
};

exports.deleteFile = async (req, res) => {
  const path = req.body.path;
  try {
    await prisma.file.delete({
      where: { id: Number(req.body.file) }
    }).then(() => {
      fs.unlink(path, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    });
    // TODO File model needs Ticket
    
    await File.find({
      ticket: mongoose.Types.ObjectId(req.params.id),
    });
    res.status(200).json({ sucess: true, files, message: "File Deleted" });
  } catch (error) { }
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