const express = require("express");
const router = express.Router();

const {
  isAuth,
} = require("../middleware/authCheck");

const {
  create,
  getAll,
  deleteClient,
  updateClient,
  createNote,
  getNote,
} = require("../controller/client");

router.route("/create").post(isAuth, create);

router.route("/allclients").get(isAuth, getAll);

router.route("/delete/:id").delete(isAuth, deleteClient);

router.route("/update").put(isAuth, updateClient);

router.route("/createNote").post(isAuth, createNote);

router.route('/getNote/:id').get(isAuth, getNote);

module.exports = router;
