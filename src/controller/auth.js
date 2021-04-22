const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { prisma } = require("../../prisma/prisma");
const { PrismaClientKnownRequestError } = require("@prisma/client/runtime");

exports.Signup = async (req, res) => {
  try {
    const { email, firstName, lastName, password } = req.body;
    const emailLower = email.toLowerCase();
    if ((!email, !firstName, !lastName, !password)) {
      console.log('failed')
      return res.status(422).json({ error: "Please add all fields" });
    }
    try {
      await prisma.user.create({
        data: {
          firstName,
          lastName,
          email: emailLower,
          password: String(bcrypt.hash(password, 10)),
          isAdmin: false,
        },
      });
      res
        .status(200)
        .json({ message: "User saved successfully", failed: false });
    } catch (error) {
      res.json({ error: "A user with that email already exists 😮", error });
      console.log(error)
      return;
    }
  } catch (error) {
    console.log(error);
    res.json({ message: error, failed: true });
  }
};

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailLower = email.toLowerCase();
    if (!email || !password) {
      return res
        .status(422)
        .json({ error: "please add email or password", auth: false });
    }
    const user = await prisma.user.findUnique({
      where: { email: emailLower },
    });
    if (user && bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        {
          email: user.email,
          id: user.id,
          role: user.isAdmin,
          time: new Date(),
        },
        process.env.JWT_SECRET
      );
      res.cookie("token", token, {
        maxAge: 1000 * 60 * 60 * 12,
        sameSite: true,
      });
      res.status(200).json({
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isAdmin: user.isAdmin,
        },
        auth: true,
      });
    } else {
      res
        .status(500)
        .json({ message: "Unable to process request", auth: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to process request", auth: false });
  }
};

exports.Token = async (req, res) => {
  const { token } = req.cookies;
  try {
    if (!token) {
      return res
        .status(401)
        .json({ message: "You must be logged in", auth: false });
    } else {
      return res
        .status(200)
        .json({ message: "You are already logged in", auth: true });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message, auth: false });
  }
};

exports.resetPasswordAdmin = async (req, res) => {
  const { password } = req.body;
  try {
    const hashedPass = await bcrypt.hash(password, 10);
    // update throws an exception if record not found, so
    // we can skip checking if user exists in this block
    await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: {
        password: hashedPass,
      },
    });
    res
      .status(200)
      .json({ message: "Password reset successfully", failed: false });
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientKnownRequestError) {
      return res.status(422).json({ error: "User doesnt exist" });
    }
    res.status(500).json({ message: error, failed: true });
  }
};

exports.resetPasswordUser = async (req, res) => {
  const { password } = req.body;
  try {
    const hashedPass = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: {
        password: hashedPass,
      },
    });
    res
      .status(201)
      .json({ message: "password updated success", failed: false });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return res.status(422).json({ error: "User doesnt exist" });
    }
    res.status(500).json({ message: error, failed: true });
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({})
    res.json({users, failed: false})
  } catch (error) {
    console.log(error);
    return res.status(422).json({ error, failed: true });
  }
};

exports.getUserById = async (req, res) => {
  try {
    await prisma.user
      .findUnique({
        where: { id: Number(req.body._id) },
      })
      .then((user) => {
        res.json({ user, failed: false });
      });
  } catch (error) {
    res.status(404).json({ message: "User not found", error, failed: true });
  }
};

exports.changeRole = async (req, res) => {
  //   try {
  //     // TODO add role field to User model
  //     await User.findByIdAndUpdate(
  //       { _id: mongoose.Types.ObjectId(user) },
  //       {
  //         $set: { isAdmin: role },
  //       },
  //       {
  //         new: true,
  //       }
  //     ).exec();
  //     console.log("Updated record");
  //     return res
  //       .status(200)
  //       .json({ message: "User Role Updated", failed: false });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ message: error, failed: true });
  //   }
};

exports.edit = async (req, res) => {
  // TODO email needs toLowerCase?
  // TODO add name field to User model or change its usage to combination of first and last name

  // done -> lower case
  // done -> added first and last name
  const email = req.body.email.toLowerCase();
  try {
    await prisma.user.update({
      where: { id: Number(req.body.id) },
      data: {
        firstName: req.body.fname,
        lastName: req.body.lname,
        email: email,
      },
    });
    return res.status(200).json({ message: "User Updated", failed: false });
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientKnownRequestError) {
      return res.status(422).json({ error: "User doesnt exist" });
    }
    return res.status(500).json({ message: error, failed: true });
  }
};

exports.profile = async (req, res) => {
  const emailLower = req.body.email.toLowerCase();
  try {
    await prisma.user.update({
      where: { id: Number(req.body.id) },
      data: {
        name: req.body.name,
        email: emailLower,
      },
    });

    await prisma.user
      .findUnique({
        where: { id: Number(req.body.id) },
      })
      .then((user) => {
        const { id, name, email } = user;
        res.status(200).json({
          message: "User updated",
          user: { id, name, email },
          fail: false,
        });
      });
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientKnownRequestError) {
      return res.status(422).json({ error: "User doesnt exist" });
    }
    return res.status(500).json({ message: error, fail: true });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: Number(req.params.id) },
    });
    return res.status(201).json({ message: "User deleted", fail: false });
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientKnownRequestError) {
      return res.status(404).json({ error: "User not found", success: false });
    }
    return res.status(500).json({ message: error, failed: true });
  }
};

exports.saveFile = async (req, res) => {
  const file = req.files.file;
  const uploadPath = "files/" + `${req.user.id}/` + file.name;

  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    } else {
      prisma.file
        .create({
          data: {
            filename: file.name,
            userId: Number(req.user.id),
            path: uploadPath,
          },
        })
        .then(() => {
          file.mv(uploadPath, function (err) {
            if (err) {
              return res.status(500).json({ sucess: false, err });
            }
            return res
              .status(200)
              .json({ sucess: true, message: "File Uploaded!" });
          });
        });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

exports.listFile = async (req, res) => {
  try {
    const files = await prisma.file.findMany({
      where: { userId: Number(req.user.id) },
    });
    res.status(200).json({ sucess: true, files });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error, failed: true });
  }
};

exports.deleteFile = async (req, res) => {
  const path = req.body.path;
  console.log(req.body);
  try {
    await prisma.file
      .delete({
        where: { id: Number(req.body.file) },
      })
      .then(() => {
        fs.unlink(path, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      });
    const files = await prisma.file.findMany({
      where: { userId: Number(req.user.id) },
    });
    res.status(200).json({ sucess: true, files, message: "File Deleted" });
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientKnownRequestError) {
      return res.status(404).json({ error: "File not found", success: false });
    }
    return res.status(500).json({ message: error, failed: true });
  }
};

exports.downloadFile = async (req, res) => {
  const filepath = req.body.filepath;
  try {
    res.download(filepath, (err) => {
      if (err) console.log(err);
    });
  } catch (error) {
    console.log(error);
  }
};
