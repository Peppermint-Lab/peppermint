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
  changeRole,
  getUserById,
  edit
} = require("../controller/auth");

router.route("/Login").post(Login);

router.route("/Signup").post(Signup);

router.route("/token").post(mid, Token);

router.route("/getAllUsers").get(mid, getUsers);

router.route("/resetPassword").post(mid, resetPasswordAdmin);

router.route("/resetPassword/user").post(mid, resetPasswordUser);

router.route("/changeRole").put(mid, changeRole);

router.route('/getById').post(mid, getUserById);

router.route('/edit').put(mid, edit);

module.exports = router;
