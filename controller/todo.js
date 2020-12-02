const mongoose = require('mongoose')
const Todo = mongoose.model("Todo");

exports.getTodos = (req, res) => {
    console.log('getTodos')
    try {
        Todo.find({createdBy: req.user._id})
        .populate("createdBy", "_id name")
        .then(todo => {
            res.json({todo})
        })
    } catch (error) {
        console.log(error)
    }
}

exports.createTodo = (req, res) => {
    console.log('createTodo')
    try {
        const {text} = req.body
        if(!text) {
            console.log('No text found!')
            return res.status(422)
        } else {
            res.status(200)
            const todo = new Todo({
                text,
                createdBy: req.user._id
            })
            todo.save()
        }
    } catch (error) {
        console.log(error)
    }
}

exports.deleteTodo = (req, res) => {
    console.log('deleteTodo')
    try {
        
    } catch (error) {
        
    }
}