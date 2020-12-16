const express = require('express');
const router = express.Router();
const reqLogin = require('../middleware/authCheck');

const { getTodos, createTodo, deleteTodo, markOneAsDone, markAllAsDone } = require ('../controller/todo');

router
    .route('/getTodo')
    .get(reqLogin, getTodos)

router
    .route('/createTodo')
    .post(reqLogin, createTodo)

router
    .route('/deleteTodo/:id')
    .delete(reqLogin, deleteTodo)

router
    .route('/markOneAsDone/:id')
    .put(reqLogin, markOneAsDone)

router
    .route('/markAllAsDone')
    .put(reqLogin, markAllAsDone)


module.exports = router;