const { prisma } = require("../../../../../prisma/prisma");

export default async function handler(req, res) {
  const { id } = req.body;
  try {
    const queues = await prisma.emailQueue.delete({
      where: {
        id: id,
      },
    });

    res.status(200).json({ success: true, queues });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
