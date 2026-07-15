const Category = require("../../models/categoryModel");
const Product = require("../../models/productModel");
const {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const s3 = require("../../config/s3Config.js");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

class ProductController {
  getAllProducts = async (req, res) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });

      const updatedProducts = await Promise.all(
        products.map(async (product) => {
          // Clone the product object to plain JS object to safely mutate
          const productObj = product.toObject();

          if (productObj.images && productObj.images.length > 0) {
            productObj.images = await Promise.all(
              productObj.images.map(async (imageKey) => {
                const imageParams = {
                  Bucket: process.env.S3_BUCKET_NAME,
                  Key: imageKey,
                  Expires: 604800,
                };
                const command = new GetObjectCommand(imageParams);
                return await getSignedUrl(s3, command, { expiresIn: 604800 });
              })
            );
          }

          return productObj;
        })
      );

      res.status(200).json(updatedProducts);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to fetch products", error: error.message });
    }
  };

  getSingleProduct = async (req, res) => {
    try {
      const { slug } = req.params;
      if (!slug) {
        return res.status(400).json({ message: "Cannot Find Product" });
      }
      const product = await Product.findOne({ slug });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const productObj = product.toObject();

      if (productObj.images && productObj.images.length > 0) {
        productObj.images = await Promise.all(
          productObj.images.map(async (imageKey) => {
            const imageParams = {
              Bucket: process.env.S3_BUCKET_NAME,
              Key: imageKey,
              Expires: 604800,
            };
            const command = new GetObjectCommand(imageParams);
            return await getSignedUrl(s3, command, { expiresIn: 604800 });
          })
        );
      }

      res.status(200).json(productObj);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to fetch products", error: error.message });
    }
  };

  createProduct = async (req, res) => {
    const { name, description, price } = req.body;

    if (!name || !price || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image is required" });
    }

    try {
      const imageKeys = [];

      // Upload each image to S3
      for (const file of req.files) {
        const imageName = Date.now().toString() + "-" + file.originalname;
        const imageParams = {
          Bucket: process.env.S3_BUCKET_NAME,
          Key: imageName,
          Body: file.buffer,
          ContentType: file.mimetype,
        };

        await s3.send(new PutObjectCommand(imageParams));
        imageKeys.push(imageName);
      }
      const savedProduct = await Product.create({
        ...req.body,
        images: imageKeys,
        colors: JSON.parse(req.body.colors) || [],
      });

      res.status(201).json(savedProduct);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({
        message: "Failed to create product",
        error: error.message,
      });
    }
  };

  async deleteProduct(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      // delete images from S3
      for (const imageKey of deletedProduct.images) {
        const deleteParams = {
          Bucket: process.env.S3_BUCKET_NAME,
          Key: imageKey,
        };
        await s3.send(new DeleteObjectCommand(deleteParams));
      }
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to delete product", error: error.message });
    }
  }

  async editProduct(req, res) {
    try {
      const { id } = req.params;
      const { name, description, price, originalPrice, colors, category } = req.body;
      if (!id) {
        return res.status(400).json({ message: "ID is required" });
      }
      const updatedData = {
        name,
        description,
        price,
        originalPrice: originalPrice ? Number(originalPrice) : undefined,
        category,
        colors: colors ? JSON.parse(colors) : [],
      };
      const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
        new: true,
      });

      let removedImages = [];
      if (req.body.removedImages) {
        try {
          removedImages = JSON.parse(req.body.removedImages);
        } catch (error) {
          console.error("Error parsing removedImages:", error);
        }
      }

      if (
        removedImages &&
        Array.isArray(removedImages) &&
        removedImages.length > 0
      ) {
        for (const imageURL of removedImages) {
          // Extract the key from the URL
          // Handle both full URLs and relative paths
          let imageKey;

          if (imageURL.startsWith("http")) {
            // Full URL - extract the key from S3 URL
            const urlParts = imageURL.split("/");
            // Get the part after bucket name and before query params
            const keyWithParams = urlParts.slice(4).join("/");
            imageKey = keyWithParams.split("?")[0];
            // Decode URL encoding (e.g., %20 -> space)
            imageKey = decodeURIComponent(imageKey);
          } else {
            // Relative path - use as is
            imageKey = imageURL;
          }

          try {
            const deleteParams = {
              Bucket: process.env.S3_BUCKET_NAME,
              Key: imageKey,
            };
            await s3.send(new DeleteObjectCommand(deleteParams));

            // Remove from product images array
            updatedProduct.images = updatedProduct.images.filter(
              (img) => !img.includes(imageKey) && img !== imageKey
            );
          } catch (deleteError) {
            console.error(
              "Error deleting image from S3:",
              imageKey,
              deleteError
            );
            // Continue with other images even if one fails
          }
        }

        await updatedProduct.save();
      }

      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const imageName = Date.now().toString() + "-" + file.originalname;
          const imageParams = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: imageName,
            Body: file.buffer,
            ContentType: file.mimetype,
          };
          await s3.send(new PutObjectCommand(imageParams));
          updatedProduct.images.push(imageName);
        }
        await updatedProduct.save();
      }
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error("Error editing product:", error);
      return res
        .status(500)
        .json({ message: "Failed to edit product", error: error.message });
    }
  }

  async addCategory(req, res) {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    try {
      const newCategory = new Category({ name });
      const savedCategory = await newCategory.save();
      res.status(201).json(savedCategory);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to create category", error: error.message });
    }
  }

  async deleteCategory(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
    try {
      const deletedCategory = await Category.findByIdAndDelete(id);
      if (!deletedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to delete category", error: error.message });
    }
  }

  async getCategories(req, res) {
    try {
      const categories = await Category.find().sort({ createdAt: -1 });
      res.status(200).json(categories);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to fetch categories", error: error.message });
    }
  }
}
module.exports = new ProductController();
