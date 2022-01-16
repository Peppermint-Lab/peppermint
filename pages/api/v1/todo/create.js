const { prisma } = require("../../../../prisma/prisma");

export default async function create() {
  try {
    const text = req.body.todo;
    if (!text) {
      console.log("No text found!");
      return res.status(422);
    } else {
      const todo = await prisma.todos.create({
        data: {
          text,
          userId: Number(req.user.id),
        },
      });
      res.status(200).json({
        todo,
      });
    }
    
    res.status(201).json({ success: true, message: "Ticket saved" });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
}
