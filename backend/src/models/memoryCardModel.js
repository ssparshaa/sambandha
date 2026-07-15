const mongoose = require("mongoose");

const memoryCardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: false, trim: true },
    image: { type: String },
    audio: { type: String },
    // bgColor: { type: String, required: true },
    date: { type: Date, default: Date.now },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    folder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      // required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MemoryCard", memoryCardSchema);
