const express = require('express');
const router = express.Router();
const reqLogin = require('../middleware/authCheck');

const { getTodos, createTodo, deleteTodo} = require ('../controller/todo');

router
    .route('/getTodo')
    .get(reqLogin, getTodos)

router
    .route('/createTodo')
    .post(reqLogin, createTodo)

// router
  //  .route('/todo/deleteTodo')
  // .delete(reqLogin, deleteTodo)


module.exports = router;