const { prisma } = require("../../../../../prisma/prisma");

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const u = await prisma.user.findUnique({
      where: { id: id },
      select: {
        notify_ticket_created: true,
        notify_ticket_status_changed: true,
        notify_ticket_comments: true,
        notify_ticket_assigned: true,
        language: true
      },
    });

    return res.status(200).json({ user: u, failed: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
