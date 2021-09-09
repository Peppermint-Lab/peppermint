const express = require("express");
const router = express.Router();

const { isAuth, isAdmin } = require("../middleware/authCheck");

const { Login } = require("../controller/auth/Login");
const { Signup } = require("../controller/auth/signUp");
const {
  resetPasswordAdmin,
} = require("../controller/auth/passwordReset/resetAdmin");
const {
  resetPasswordUser,
} = require("../controller/auth/passwordReset/resetUser");
const { Token } = require("../controller/auth/token");
const { getUsers } = require("../controller/auth/users/getAllUsers");
const { getUserById } = require("../controller/auth/users/getUserById");
const { edit } = require("../controller/auth/users/edit");
const { userProfile } = require("../controller/auth/users/userProfile");
const { deleteUser } = require("../controller/auth/users/deleteUser");
const { saveFile } = require('../controller/auth/file/saveFile')
const { listFile } = require('../controller/auth/file/listFile')
const { deleteFile } = require('../controller/auth/file/deleteFile')
const { downloadFile } = require('../controller/auth/file/downloadFile')


router.route("/Login").post(Login);
router.route("/Signup").post(Signup);
router.route("/token").get(isAuth, Token);
router.route("/getAllUsers").get(isAuth, getUsers);
router.route("/resetPassword/:id").post(isAuth, resetPasswordAdmin);
router.route("/resetPassword/user/:id").post(isAuth, resetPasswordUser);
router.route("/getById").post(isAuth, getUserById);
router.route("/edit").put(isAuth, edit);
router.route("/profile").put(isAuth, userProfile);
router.route("/delete/:id").delete(isAuth, deleteUser);
router.route("/uploadFile/upload").post(isAuth, saveFile);
router.route("/file/listFiles").get(isAuth, listFile);
router.route("/file/del").post(isAuth, deleteFile);
router.route("/file/download").post(isAuth, downloadFile);

module.exports = router;
