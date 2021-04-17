import { prisma } from "../../prisma/prisma";

// Create a new newsletter
exports.create = async (req, res) => {
  try {
    const { title, text, active } = req.body;
    if ((!title, !text)) {
      return res.status(422).json({ error: "Please add all the fields" });
    } else {
      const newsletter = await prisma.newsletter.create({
        title,
        text,
        authorId: Number(req.user.id),
        active,
      });
      return res.status(200).json({ newsletter });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ failed: true, message: "Failed to create " });
  }
};

// Get All newsletters
exports.getNewsletters = async (req, res) => {
  try {
    const newsletters = await prisma.newsletter.findMany({
      include: {
        createdBy: {
          select: { id: true, firstName: true, lastName: true }
        }
      }
    });
    return res.status(200).json({ newsletters });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ failed: true, message: "Failed to get newsletters " });
  }
};

// Get All Active newsletters
exports.getActiveNewsletters = async (req, res) => {
  try {
    const newsletters = await prisma.newsletter.findMany({
      where: { active: true },
      include: {
        createdBy: {
          select: { id: true, firstName: true, lastName: true }
        }
      }
    });
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

    await prisma.newsletter.update({
      where: { id: Number(req.body.id) },
      data: {
        title: req.body.title,
        text: req.body.text,
        active: req.body.active,
      }
    });
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
    await prisma.newsletter.delete({
      where: { id: Number(req.params.id) }
    });
    const newsletters = await prisma.newsletter.findMany({
      include: {
        createdBy: {
          select: { id: true, firstName: true, lastName: true }
        }
      }
    });
    res.status(200).json({ newsletters });
  } catch (error) {
    console.log(error);
    res.status(500).json({ failed: true, message: "Failed to delete " });
  }
};
