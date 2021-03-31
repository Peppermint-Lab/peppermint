const mongoose = require("mongoose");
const User = mongoose.model("InternalUser");
const File = mongoose.model("file");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Signup = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const emailLower = email.toLowerCase();
    if ((!email, !name, !password)) {
      return res.status(422).json({ error: "Please add all fields" });
    }
    await User.findOne({ email: email }).then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "user already exists with that email" });
      }
      bcrypt.hash(password, 10).then((hashedpassword) => {
        const user = new User({
          email: emailLower,
          password: hashedpassword,
          name,
        });
        user.save();
        res.status(200).json({ message: "User saved successfully", user, failed: false });
      });
    });
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
      return res.status(422).json({ error: "please add email or password", auth: false });
    }
    await User.findOne({ email: emailLower }).then((savedUser) => {
      if (!savedUser) {
        return res.status(422).json({ error: "Invalid Email or password", auth: false });
      }
      bcrypt.compare(password, savedUser.password).then((doMatch) => {
        if (doMatch) {
          const token = jwt.sign(
            { _id: savedUser._id, expiresIn: 86400 },
            process.env.JWT_SECRET
          );
          const { _id, name, email, role } = savedUser;
          res.cookie("token", token, {
            maxAge: 1000 * 60 * 60 * 24,
            sameSite: true,
          });
          res.status(200).json({ user: { _id, name, email, role }, auth: true });
        } else {
          res.status(422).json({ error: "Invalid Email or password", auth: false })
        }
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to process request", auth: false })
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
    await User.findOne({ _id: mongoose.Types.ObjectId(req.params.id) }).then(
      (user) => {
        if (!user) {
          return res.status(422).json({ error: "User doesnt exist" });
        } else {
          bcrypt.hash(password, 10).then((hashedpassword) => {
            user.password = hashedpassword;
            user.save();
          });
          res.status(200).json({ message: "Password reset successfully", failed: false })
        }
      }
    );

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error, failed: true })
  }
};

exports.resetPasswordUser = async (req, res) => {
  const { password } = req.body;
  console.log(password, req.params.id)
  try {
    await User.findOne({ _id: mongoose.Types.ObjectId(req.params.id) }).then(
      (user) => {
        if (!user) {
          return res.status(422).json({ error: "User doesnt exist" });
        } else {
          bcrypt.hash(password, 10).then((hashedpassword) => {
            user.password = hashedpassword;
            user.save();
          });
          res.status(201).json({ message: "password updated success", failed: false });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error, failed: true });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users, failed: false });
  } catch (error) {
    console.log(error);
    res.status(422).json({ users, failed: true });
  }
};

exports.getUserById = async (req, res) => {
  console.log(req.body);
  try {
    await User.find({ _id: req.body._id }).then((user) => {
      res.json({ user, failed: false });
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "User not found", error, failed: true });
  }
};

exports.changeRole = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      { _id: mongoose.Types.ObjectId(user) },
      {
        $set: { role: role },
      },
      {
        new: true,
      }
    ).exec();
    console.log("Updated record");
    return res.status(200).json({ message: "User Role Updated", failed: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error, failed: true });
  }
};

exports.edit = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      { _id: mongoose.Types.ObjectId(req.body.id) },
      {
        $set: { name: n, role: r, email: e },
      },
      { new: true }
    ).exec();
    return res.status(200).json({ message: "User Updated", failed: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error, failed: true });
  }
};

exports.profile = async (req, res) => {
  const emailLower = req.body.email.toLowerCase()
  try {
    await User.findByIdAndUpdate(
      { _id: req.user._id },
      {
        $set: { name: req.body.name, email: emailLower }
      },
      { new: true }
    ).exec();
      User.findOne({ _id: req.user._id })
      .then((user) => {
        const { _id, name, email, role } = user;
        res.status(200).json({ message: "User updated", user: {_id, name, email, role}, fail: false})
      })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error, fail: true });
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const user = await new mongoose.Types.ObjectId(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }
    await User.findOneAndDelete({ _id: req.params.id });
    return res.status(201).json({ message: "User deleted", fail: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error, failed: true });
  }
};

exports.saveFile = async (req, res) => {
  const file = req.files.file;
  const uploadPath = "files/" + `${req.user._id}/` + file.name;

  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    } else {
      const newFile = new File({
        filename: file.name,
        user: req.user._id,
        path: uploadPath,
      });
      newFile.save().then(() => {
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
    console.log(error)
    res.status(500).json({ message: error })
  }
};

exports.listFile = async (req, res) => {
  try {
    const files = await File.find({
      user: mongoose.Types.ObjectId(req.user._id),
      ticket: null
    });
    res.status(200).json({ sucess: true, files });
  } catch (error) {}
};

exports.deleteFile = async (req, res) => {
  const path = req.body.path;
  try {
    await File.deleteOne({ _id: req.body.file }).then(() => {
      fs.unlink(path, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    });
    const files = await File.find({
      user: mongoose.Types.ObjectId(req.user._id),
    });
    res.status(200).json({ sucess: true, files, message: "File Deleted" });
  } catch (error) {}
};

exports.downloadFile = async (req, res) => {
  const filepath = req.body.filepath
  try {
    res.download(filepath, (err) => {
      if (err) console.log(err)
    }) 
  } catch (error) {
    console.log(error)
  }
};

