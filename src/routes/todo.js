const express = require("express");
const router = express.Router();
const {
  isAuth,
} = require("../middleware/authCheck");

const {
  getTodos,
  createTodo,
  deleteTodo,
  markOneAsDone,
  markAllAsDone,
  markUndone,
} = require("../controller/todo");

router.route("/getTodo").get(isAuth, getTodos);

router.route("/createTodo").post(isAuth, createTodo);

router.route("/deleteTodo/:id").delete(isAuth, deleteTodo);

router.route("/markOneAsDone/:id").put(isAuth, markOneAsDone);

router.route("/markAllAsDone").put(isAuth, markAllAsDone);

router.route("/markUndone/:id").put(isAuth, markUndone);

module.exports = router;
