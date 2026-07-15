const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "Token Not Provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Token Not Provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ success: false, message: "Invalid Token" });
    }

    try {
      req.user = await userModel.findById(decoded.id).select("-password");
      if (!req.user) {
        return res
          .status(401)
          .json({ success: false, message: "Token Verification Failed" });
      }
      if (req.user.role !== "admin") {
        return res
          .status(403)
          .json({ success: false, message: "Access Denied" });
      }
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ success: false, message: "Token Verification Failed" });
    }
  });
};
