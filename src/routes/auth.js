const express = require("express");
const router = express.Router();

const {
  isAuth,
  isAdmin
} = require("../middleware/authCheck");

const {
  Login,
  Signup,
  Token,
  getUsers,
  resetPasswordAdmin,
  resetPasswordUser,
  getUserById,
  edit,
  deleteUser,
  profile
} = require("../controller/auth");

router.route("/Login").post(Login);

router.route("/Signup").post(Signup);

router.route("/token").get(isAuth, Token);

router.route("/getAllUsers").get(isAuth, isAdmin, getUsers);

router.route("/resetPassword/:id").post(isAuth, isAdmin, resetPasswordAdmin);

router.route("/resetPassword/user/:id").post(isAuth, resetPasswordUser);

router.route('/getById').post(isAuth, isAdmin, getUserById);

router.route('/edit').put(isAuth, isAdmin, edit);

router.route('/profile').put(isAuth, profile);

router.route('/delete/:id').delete(isAuth, isAdmin, deleteUser);

module.exports = router;
