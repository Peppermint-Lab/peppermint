const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("InternalUser");

// Check to make sure the request is coming from an authenticated user
exports.isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ error: "You must be logged in", auth: false });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        return res.status(401).json({ error: "You must be logged in", auth: false });
      }
      const { _id } = payload;
      await User.findById(_id).then((userdata) => {
        req.user = userdata;
        next();
      });
    });
  } catch(error) {
    console.log(error);
    return res.status(500).json({ message: 'There was an error processing your request' });
  }
}

// Check to make sure the request is coming from a user who's role is 'admin'
exports.isAdmin = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ error: "You must be logged in", auth: false });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        return res.status(401).json({ error: "You must be authenticated", auth: false });
      }
      const { _id } = payload;
      await User.findById(_id).then((userdata) => {
        if(userdata.role !== 'admin' ) {
          return res.status(403).json({ message: 'Forbidden' });
        } else {
          req.user = userdata;
          next();
        }
      });
    });
  } catch(error) {
    console.log(error);
    return res.status(500).json({ message: 'There was an error processing your request' });
  }
}