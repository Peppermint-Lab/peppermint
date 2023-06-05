const { prisma } = require("../../../../../prisma/prisma");

export default async function handler(req, res) {
  try {
    const queues = await prisma.emailQueue.findMany({});

    res.status(200).json({ success: true, queues });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
