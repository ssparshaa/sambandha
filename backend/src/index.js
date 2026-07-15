const express = require("express");
require("dotenv/config");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./modules/auth/auth.routes.js");
const userRoute = require("./modules/user/user.routes.js");
const adminRoute = require("./modules/admin/admin.routes.js");
const orderRoute = require("./modules/order/order.routes.js");
const folderRoute = require("./modules/folder/folder.routes.js");
const productRoute = require("./modules/product/product.routes.js");
const memoryCardRoute = require("./modules/memoryCard/memoryCard.routes.js");

const app = express();

const allowedOrigins = [
  "https://sambandha.co",
  "https://www.sambandha.co",
  "http://localhost:3000",
  "http://localhost:3001",
  process.env.CLIENT_ORIGIN,
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRoute);
app.use("/admin", adminRoute);
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/order", orderRoute);
app.use("/folder", folderRoute);
app.use("/memoryCard", memoryCardRoute);
app.get("/", (req, res) => {
  res.send("Server is Running...." + process.env.CLIENT_ORIGIN);
});

const port = process.env.PORT || 8000;

// function to connect to MongoDB
async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGODBCONNECTIONSTRING);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1); // Stop the app if connection fails
  }
}

// Function to start server
async function startServer() {
  await connectDB();
  app.listen(port, () => {
    console.log(`🚀 Server is Running at http://localhost:${port}`);
  });
}

// run the server
startServer();
