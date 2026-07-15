const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    color: { type: String, required: true, default: "#f9ca24" },
    isPrivate: { type: Boolean, default: false },
    password: { type: String, trim: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Folder", folderSchema);
