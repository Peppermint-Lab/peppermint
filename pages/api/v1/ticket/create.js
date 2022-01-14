const { prisma } = require("../../../../prisma/prisma");

export default async function create() {
  try {
    const { name, company, issue, priority, email, engineer } = req.body;
    if (!name || !company || !issue || !priority) {
      return res
        .status(422)
        .json({ error: "Please add all the fields", failed: true });
    }
    await prisma.ticket
      .create({
        data: {
          name: req.body.name,
          issue,
          priority,
          email,
          client: {
            connect: { id: Number(company) },
          },
          assignedTo: {
            connect: { id: Number(engineer) },
          },
          isIssued: Boolean(true),
          isComplete: Boolean(false),
        },
      })
      .then((ticket) => {
        res.status(201).json({ message: "Ticket created correctly", ticket });
      });
  } catch (error) {
    console.log(error);
  }
}
