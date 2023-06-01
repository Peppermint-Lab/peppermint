const { prisma } = require("../../../../../prisma/prisma");


export default async function notifications(req, res) {
  const { id } = req.query

  const { ticket_assigned, ticket_creation, ticket_status } = req.body

  try {
    await prisma.user.update({
      where: { id: id },
      data: {
        notify_ticket_assigned: ticket_assigned,
        notify_ticket_comments: true,
        notify_ticket_created: ticket_creation,
        notify_ticket_status_changed: ticket_status
      },
    });
    return res.status(200).json({ message: "option Updated", failed: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
