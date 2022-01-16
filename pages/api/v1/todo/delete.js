const { prisma } = require("../../../../prisma/prisma");

export default async function deleteTodo(req, res) {
  try {
     const todo = await doesTodoExist(Number(req.params.id));
     
    if (!todo) {
      return res.status(404).json({
        success: false,
        error: "Todo not found.",
      });
    }

    await prisma.todos.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.status(201).json({ success: true, message: "Todo deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
}
