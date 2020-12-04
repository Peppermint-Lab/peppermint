const mongoose = require("mongoose");
const Todo = mongoose.model("Todo");
const User = mongoose.model("InternalUser");

exports.getTodos = async (req, res) => {
  console.log("getTodos");
  try {
    Todo.find({ createdBy: req.user._id })
      .populate("createdBy", "_id name")
      .then((todo) => {
        res.json({ todo });
      });
  } catch (error) {
    console.log(error);
  }
};

exports.createTodo = async (req, res) => {
  console.log("createTodo");
  try {
    const { text } = req.body;
    if (!text) {
      console.log("No text found!");
      return res.status(422);
    } else {
      res.status(200);
      const todo = new Todo({
        text,
        createdBy: req.user._id,
      });
      todo.save();
    }
  } catch (error) {
    console.log(error);
  }
};

exports.deleteTodo = async (req, res) => {
  console.log("deleteTodo");
  try {
    const todo = await new mongoose.Types.ObjectId(req.params.id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        error: "Todo not found.",
      });
    }
    await Todo.findOneAndDelete({ _id: req.params.id });
    return res.status(201);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

exports.markOneAsDone = async (req, res) => {
  console.log("markOneAsDone");
  console.log(req.params.id)
  try {
    const todo = await new mongoose.Types.ObjectId(req.params.id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        error: "Todo not found.",
      });
    }
    await Todo.findOneAndUpdate(
    { _id: req.params.id }, { $set: { done: true }},
      {
        new: true,
      }
    ).exec();
    console.log("Updated record");
  } catch (error) {
    console.log(error);
  }
};

exports.markAllAsDone = (req, res) => {
  console.log("markAllAsDone");
  try {
    Todo.updateMany(
        { $set: { done: true } },
        function(err, result) {
          if (err) {
            res.send(err);
          } else {
            res.send(result);
          }
        }
      );
  } catch (error) {
    console.log(error)
  }
};


exports.saveNote = (req, res) => {
  console.log('Note Saved')
  console.log(req.body)
  console.log(req.user._id)

  try {
    const { text } = req.body;
    if(!text) {
      return res.status(422).json({error: "Please add some text"});
    }
    User.findByIdAndUpdate(
      {_id: req.user._id},
      {
        $push: { notes: text},
      }, {
        new: true
      }
    ).exec();
    console.log('Note saved');
  } catch (error) {
    console.log(error)
  }
}

exports.getNotes = (req, res ) => {
  console.log('Get Notes')
  try {
    User.find({ notes })
      .populate("notes", "_id name")
      .then((note) => {
        res.json({ note });
      });
  } catch (error) {
    console.log(error)
  }
}