const express = require("express");
const productController = require("./product.controller");
const adminController = require("../../middlewares/adminMiddleware");
const multer = require("multer");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// GET all products
router.get("/", productController.getAllProducts);
// GET a single product
router.get("/single/:slug", productController.getSingleProduct);
// DELETE a product
router.delete("/:id", adminController, productController.deleteProduct);
// PUT update a product
router.put(
  "/:id",
  adminController,
  upload.array("images"),
  productController.editProduct
);
// POST a new product
router.post(
  "/",
  adminController,
  upload.array("images"),
  productController.createProduct
);

// GET categories
router.get("/categories", adminController, productController.getCategories);
// POST a new category
router.post("/addCategory", adminController, productController.addCategory);
// DELETE a category
router.delete(
  "/deleteCategory/:id",
  adminController,
  productController.deleteCategory
);

module.exports = router;
