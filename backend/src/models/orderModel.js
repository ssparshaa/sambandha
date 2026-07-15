const mongoose = require("mongoose");

// Define the schema for the Order model
const orderSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    userPhone: {
      type: String,
      required: true,
    },
    userAddress: {
      type: String,
    },
    products: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // Reference to the Product model
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        color: {
          type: String,
          required: true,
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "paid",
        "processing",
        "shipped",
        "delivered",
        "bill_pending",
        "returned",
        "refund_processing",
        "refunded",
        "failed",
      ], // Enum for order status
      default: "pending",
    },
  },
  { timestamps: true }
);

// Create and export the model
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
