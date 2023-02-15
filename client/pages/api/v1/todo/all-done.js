const { prisma } = require("../../../../prisma/prisma");

export default async function allDone(req, res) {
  try {
    aprisma.todos
      .updateMany({
        where: {
          userId: Number(req.user.id),
        },
        data: {
          done: true,
        },
      })
      .then((_) => {
        return prisma.todos.findMany({
          where: {
            userId: req.user.id,
          },
        });
      })

    res.status(201).json({ success: true, message: "Mark all as done" });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
}
