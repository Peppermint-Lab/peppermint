import { prisma } from "../../prisma/prisma";

const doesTodoExist = async (id) => {
  const exists = await prisma.todos.findUnique({
    where: {
      id: id
    }
  }).then(Boolean)

  return exists
}

exports.getTodos = async (req, res) => {
  try {
    const todos = await prisma.todos.findMany({
      where: { createdBy: req.user._id },
      select: {
        id: true,
        text: true,
        done: true,
      }
    })
    res.json({ todos })
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
          createdBy: req.user._id,
        }
      })
      res.status(200).json({
        todo
      })
    }
  } catch (error) {
    console.log(error);
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await doesTodoExist(req.params.id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        error: "Todo not found.",
      });
    }
    await prisma.todos.delete({
      where: {
        id: req.params.id
      }
    })
    return res.status(201).json({
      data: {}
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

      prisma.todos.update({
        where: {
          id: req.params.id
        },
        data: {
          done: true
        }
      }).then((todo) => {
        res.json({ todo });
      });
      console.log("Updated record");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.markAllAsDone = async (req, res) => {
  try {

    prisma.todos.updateMany({
      where: {
        createdBy: req.params.id
      },
      data: {
        done: true,
      }
    }).then(_ => {
      return prisma.todos.findMany({
        where: {
          createdBy: req.user._id
        }
      })
    }).then((todos) => {
      res.json({ todos })
    })
  } catch (error) {
    res.send(error)
    console.log(error);
  }
};

exports.markUndone = async (req, res) => {
  try {
    prisma.todos.update({
      where: {
        id: req.params.id
      },
      data: {
        done: false
      }
    }).then(todo => {
      res.status(200).json({ todo });
    })
  } catch (error) {
    console.log(error);
  }
};