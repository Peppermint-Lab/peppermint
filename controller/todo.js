const mongoose = require('mongoose')
const Todo = mongoose.model("Todo");

exports.getTodos = async (req, res) => {
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

exports.createTodo = async (req, res) => {
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

exports.deleteTodo = async (req, res) => {
    console.log('deleteTodo')
    
    
    try {
        const todo = await new mongoose.Types.ObjectId(req.params.id);
        if(!todo) {
            return res.status(404).json({
                success: false,
                error: 'Todo not found.'
            })
        } 
        await Todo.findOneAndDelete({"_id": req.params.id});
        return res.status(201)
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
}

exports.markAsDone = (req, res) => {
    console.log('MarkAsDone')
    try {
    } catch (error) {
        
    }
}