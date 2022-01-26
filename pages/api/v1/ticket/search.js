const { prisma } = require("../../../../prisma/prisma");

export default async function transferTicket(req,res) {
  try {
    const ticket = await doesTicketExist(Number(req.params.id));
    if (ticket === true) {
      await prisma.ticket
        .findUnique({
          where: {
            id: Number(req.params.id),
          },
          include: {
            client: {
              select: { id: true, name: true, number: true },
            },
            assignedTo: {
              select: { id: true, name: true },
            },
          },
        })
        .then((ticket) => {
          res.status(200).json({ sucess: true, ticket });
        });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Ticket does not exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
}
