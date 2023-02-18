const { prisma } = require("../../../../../prisma/prisma");

const doesTodoExist = async (id) => {
  const exists = await prisma.todos
    .findUnique({
      where: {
        id: Number(id),
      },
    })
    .then(Boolean);

  return exists;
};

export default async function deleteTodo(req, res) {

  const { id } = req.query

  try {
     const todo = await doesTodoExist(Number(id));
     
    if (!todo) {
      return res.status(404).json({
        success: false,
        error: "Todo not found.",
      });
    }

    await prisma.todos.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(201).json({ success: true, message: "Todo deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
}
