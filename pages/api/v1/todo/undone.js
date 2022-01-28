const { prisma } = require("../../../../prisma/prisma");

export default async function unDone(req, res) {
  try {
    prisma.todos
      .update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          done: false,
        },
      })
      .then((_) => {
        return prisma.todos.findMany({
          where: {
            userId: req.user.id,
          },
        });
      })

    res.status(201).json({ success: true, message: "Todo unmarked" });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
}
