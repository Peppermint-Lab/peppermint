const { prisma } = require("../../../../prisma/prisma");

export default async function createClient(req, res) {
  try {
    const { email, name, contactName, number } = req.body;
    if (!email || !name || !contactName || !number) {
      return res.status(422).json({ error: "Please add all fields" });
    }

    // await prisma.client.findUnique({
    //   where: { name: req.body.name }
    // }).then(async (dupeClient) => {
    //   if (dupeClient) {
    //     return res.status(422).json({ error: "client already exists" });
    //   }
    const client = await prisma.client.create({
      data: {
        name,
        email,
        contactName,
        number,
      },
    });
    res.status(200).json({ message: "Client saved successfully", client });
    // });
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
