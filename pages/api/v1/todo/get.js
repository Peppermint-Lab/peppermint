const { prisma } = require("../../../../prisma/prisma");

export default async function get() {
  try {
      
    const todos = await prisma.todos.findMany({
      where: { userId: req.user.id },
      select: {
        id: true,
        text: true,
        done: true,
      },
    });

    res.status(201).json({ success: true, message: "Todo saved", todos });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
}
