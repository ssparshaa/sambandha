const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    colors: [
      {
        type: String,
      },
    ],
    images: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

// Utility function to convert string to kebab-case
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with -
    .replace(/^-+|-+$/g, ""); // Trim - from start and end
}

// Pre-save hook to generate unique slug
productSchema.pre("save", async function (next) {
  if (!this.isModified("name")) return next();

  const baseSlug = slugify(this.name);
  const dateSuffix = Date.now(); // Unique timestamp

  this.slug = `${baseSlug}-${dateSuffix}`;

  next();
});

module.exports = mongoose.model("Product", productSchema);
