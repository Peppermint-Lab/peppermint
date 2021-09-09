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