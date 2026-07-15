const mongoose = require("mongoose");

const userModel = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    memoryCardLimit: { type: Number, default: 50 },
    wallpaper: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      required: true,
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "blocked"],
      required: true,
      default: "active",
    },
    bgImage: { type: String, default: "" },

    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userModel);
