const bcrypt = require("bcryptjs");
const validator = require("validator");
const userModel = require("../../models/userModel.js");

class AdminController {
  getUsers = async (req, res) => {
    try {
      const users = await userModel.find({ role: "user" }).select("-password");
      return res.status(200).send(users);
    } catch (error) {
      console.error("Error in getUsers:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  createUser = async (req, res) => {
    try {
      const { name, email, password, confirm_password } = req.body;
      if (!name || !email || !password || !confirm_password) {
        return res.status(400).send("All fields are required");
      }
      //validate email with validator
      if (!validator.isEmail(email)) {
        return res.status(400).send("Invalid email");
      }
      //validate password with validator
      if (!validator.isStrongPassword(password)) {
        return res.status(400).send("Password is not strong enough");
      }
      if (password !== confirm_password) {
        return res.status(400).send("Passwords do not match");
      }
      const user = await userModel.findOne({ email });
      if (user) {
        return res.status(400).send("User already exists");
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      await userModel.create({ name, email, password: hashedPassword });
      return res.status(201).send("User created successfully");
    } catch (error) {
      console.error("Error in createUser:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).send("User id is required");
      }
      const user = await userModel.findById(id);
      if (!user) {
        return res.status(404).send("User not found");
      }
      await userModel.findByIdAndDelete(id);
      return res.status(200).send("User deleted successfully");
    } catch (error) {
      console.error("Error in deleteUser:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}
module.exports = new AdminController();
