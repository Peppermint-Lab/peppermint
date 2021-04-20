// TODO error handling can be refined by using Prisma exceptions codes
const { PrismaClientKnownRequestError } = require('@prisma/client/runtime');
const { prisma } = require ("../../prisma/prisma");


exports.saveNote = async (req, res) => {
  try {
    const { text, title } = req.body;
    if ((!text, !title)) {
      return res.status(422).json({ error: "Please add some text" });
    } else {
      const note = await prisma.notes.create({
        data: {
          title,
          note: text,
          userId: Number(req.user.id),  // unsure if can be replaced by a connect statement
        }
      });
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
    await prisma.notes.findMany({
      where: { userId: Number(req.user.id) },
      include: {
        createdBy: {
          select: { id: true, firstName: true, lastName: true }
        }
      }
    }).then(notes => {
      res.status(200).json({ notes });
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteNote = async (req, res) => {
  try {
    await prisma.notes.delete({
      where: { id: Number(req.params.id) }
    });
    return res.status(201).json({
      data: {},
    });
  } catch (error) {
    console.log(error);    
    if (error instanceof PrismaClientKnownRequestError) {
      return res.status(404).json({
        success: false,
        error: "Note not found.",
      });
    }
    return res.status(500);
  }
};

exports.updateNote = async (req, res) => {
  console.log(req.body);
  try {
    await prisma.notes.update({
      where: { id: Number(req.body.id) },
      data: { note: req.body.note }
    });
    console.log("Updated Note");
    res.status(201).json({ success: true, message: "Note Updated" });
  } catch (error) {
    console.log(error);
  }
};
