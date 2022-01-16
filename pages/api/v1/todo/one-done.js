const { prisma } = require("../../../../prisma/prisma");

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

export default async function oneDone(req, res) {
  try {
    const todo = await doesTodoExist(req.params.id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        error: "Todo not found.",
      });
    } else {
      prisma.todos
        .update({
          where: {
            id: Number(req.params.id),
          },
          data: {
            done: true,
          },
        })
        
      console.log("Updated record");
    }

    res.status(201).json({ success: true, message: "Marked as Done" });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
}
