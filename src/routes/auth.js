const express = require("express");
const router = express.Router();

const mid = require("../middleware/authCheck");

const {
  Login,
  Signup,
  Token,
  getUsers,
  resetPasswordAdmin,
  resetPasswordUser,
  getUserById,
  edit,
  deleteUser
} = require("../controller/auth");

router.route("/Login").post(Login);

router.route("/Signup").post(Signup);

router.route("/token").get(mid, Token);

router.route("/getAllUsers").get(mid, getUsers);

router.route("/resetPassword/:id").post(mid, resetPasswordAdmin);

router.route("/resetPassword/user").post(mid, resetPasswordUser);

router.route('/getById').post(mid, getUserById);

router.route('/edit').put(mid, edit);

router.route('/delete/:id').delete(mid, deleteUser);

module.exports = router;
