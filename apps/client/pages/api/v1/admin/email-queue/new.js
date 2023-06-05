const { prisma } = require("../../../../../prisma/prisma");

export default async function handler(req, res) {
  const { name, username, password, hostname, tls } = req.body;
  try {
    const queues = await prisma.emailQueue.create({
        data: {
            name,
            username,
            password,
            hostname,
            tls
        }
    })

    res.status(200).json({ success: true, queues });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
