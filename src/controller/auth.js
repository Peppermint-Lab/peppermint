const mongoose = require("mongoose");
const User = mongoose.model("InternalUser");
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
        res.json({ message: "User saved successfully", user });
      });
    });
  } catch (error) {
    console.log(error);
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
        }
        bcrypt.hash(password, 10).then((hashedpassword) => {
          user.password = hashedpassword;
          user.save();
          res.status(201).json({ message: "password updated success" });
          console.log("Users Password updated");
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

exports.resetPasswordUser = async (req, res) => {
  const { password } = req.body;
  try {
    await User.findOne({ _id: mongoose.Types.ObjectId(req.user._id) }).then(
      (user) => {
        if (!user) {
          return res.status(422).json({ error: "User doesnt exist" });
        }
        bcrypt.hash(password, 10).then((hashedpassword) => {
          user.password = hashedpassword;
          user.save();
          res.status(201).json({ message: "password updated success" });
          console.log("Users Password updated");
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
  }
};

exports.getUserById = async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.find({ _id: req.body._id }).then((user) => {
      res.json({ user });
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "User not found" });
  }
};

exports.changeRole = async (req, res) => {
  console.log(req.body.role);
  const role = req.body.role;
  const user = req.body.user;

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
    return res.status(200).json({ message: "User Role Updated" });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

exports.edit = async (req, res) => {
  const n = req.body.name;
  const e = req.body.email.toLowerCase();
  const r = req.body.role;

  try {
    await User.findByIdAndUpdate(
      { _id: mongoose.Types.ObjectId(req.body.id) },
      {
        $set: { name: n, role: r, email: e },
      },
      { new: true }
    ).exec();
    res.status(200).json({ message: "User updated", fail: false})
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error, fail: false });
  }
};

exports.profile = async (req, res) => {
  const emailLower = req.body.email.toLowerCase()
  try {
    await User.findByIdAndUpdate(
      { _id: req.user.id },
      {
        $set: { name: req.body.name, email: emailLower }
      },
      { new: true }
    ).exec();
    const userInfo = User.findById({ _id: req.user._id })
    const { _id, name, email, role } = userInfo;
    res.status(200).json({ message: "User updated", user: { _id, name, email, role }, fail: false})
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error, fail: true });
  }
}

exports.deleteUser = async (req, res) => {
  console.log("Delete User");
  try {
    const user = await new mongoose.Types.ObjectId(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }
    await User.findOneAndDelete({ _id: req.params.id });
    return res.status(201);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
