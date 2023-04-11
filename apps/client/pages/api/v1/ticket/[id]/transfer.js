const { prisma } = require("../../../../../prisma/prisma");

export default async function handler(req, res) {
  const { id } = req.query;
  const { user } = req.body;

  console.log('hit')

  try {
    const r = await prisma.user.update({
      where: { id: user },
      data: {
        tickets: {
          connect: {
            id: id,
          },
        },
      },
    });

    res.status(200).json({ message: "Ticket Transferred", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
}
