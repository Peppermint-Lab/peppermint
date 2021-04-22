const express = require("express");
const router = express.Router();

const { isAuth, isAdmin } = require("../middleware/authCheck");

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
  profile,
  saveFile,
  deleteFile,
  downloadFile,
  listFile,
} = require("../controller/auth");

router.route("/Login").post(Login);

router.route("/Signup").post(Signup);

router.route("/token").get(isAuth, Token);

router.route("/getAllUsers").get(isAuth, getUsers);

router.route("/resetPassword/:id").post(isAuth, resetPasswordAdmin);

router.route("/resetPassword/user/:id").post(isAuth, resetPasswordUser);

router.route("/getById").post(isAuth, getUserById);

router.route("/edit").put(isAuth, edit);

router.route("/profile").put(isAuth, profile);

router.route("/delete/:id").delete(isAuth, deleteUser);

router.route("/uploadFile/upload").post(isAuth, saveFile);

router.route("/file/listFiles").get(isAuth, listFile);

router.route("/file/del").post(isAuth, deleteFile);

router.route("/file/download").post(isAuth, downloadFile);

module.exports = router;
