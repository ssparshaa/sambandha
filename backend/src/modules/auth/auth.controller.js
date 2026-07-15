const bcrypt = require("bcryptjs");
const userModel = require("../../models/userModel.js");
const generateToken = require("../../config/generateToken.js");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const userInfo = await userModel.findById(user._id).select("-password");
    res.status(200).json({
      success: true,
      message: "User Logged In",
      user: userInfo,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { login };
