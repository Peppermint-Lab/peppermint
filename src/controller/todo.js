const { prisma } = require("../../prisma/prisma");

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

exports.getTodos = async (req, res) => {
  try {
    const todos = await prisma.todos.findMany({
      where: { userId: req.user.id },
      select: {
        id: true,
        text: true,
        done: true,
      },
    });
    res.json({ todos });
  } catch (error) {
    console.log(error);
  }
};

exports.createTodo = async (req, res) => {
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
  } catch (error) {
    console.log(error);
  }
};

exports.deleteTodo = async (req, res) => {
  console.log(req.params.id);
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
    return res.status(201).json({
      data: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

exports.markOneAsDone = async (req, res) => {
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
        .then((_) => {
          return prisma.todos.findMany({
            where: {
              userId: req.user.id,
            },
          });
        })
        .then((todos) => {
          res.json({ todos });
        });
      console.log("Updated record");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.markAllAsDone = async (req, res) => {
  try {
    prisma.todos
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
      .then((todos) => {
        res.json({ todos });
      });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

exports.markUndone = async (req, res) => {
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
      .then((todos) => {
        res.json({ todos });
      });
  } catch (error) {
    console.log(error);
  }
};
