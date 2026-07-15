const {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const s3 = require("../../config/s3Config.js");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const userModel = require("../../models/userModel.js");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const CLIENT_URL = process.env.CLIENT_ORIGIN || "http://localhost:3000"; // your frontend URL

class UserController {
  async getUserDetail(req, res) {
    try {
      const { userId } = req.params;
      const user = await userModel.findById(userId).lean().select("-password"); // lean() for plain object

      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      // If user has bgImage, generate signed URL
      if (user.bgImage) {
        try {
          const imageParams = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: user.bgImage, // stored S3 key
          };
          const command = new GetObjectCommand(imageParams);
          const signedUrl = await getSignedUrl(s3, command, {
            expiresIn: 604800,
          }); // 7 days

          user.bgImageUrl = signedUrl; // append new field
        } catch (err) {
          console.warn("Failed to generate signed URL:", err.message);
          user.bgImageUrl = null;
        }
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error("Error in getUserDetail:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async editUserDetail(req, res) {
    try {
      const user = req.user;
      if (!user) {
        return res.status(401).send({ message: "Unauthorized" });
      }
      const userId = user._id;
      const { name, email } = req.body;

      const updatedUser = await userModel
        .findByIdAndUpdate(userId, { name, email }, { new: true })
        .select("-password");
      return res.status(200).send(updatedUser);
    } catch (error) {
      console.error("Error in editUserDetail:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async changeWallpaper(req, res) {
    try {
      const { userId } = req.params;
      const { wallpaper } = req.body;
      const user = await userModel.findByIdAndUpdate(
        userId,
        { wallpaper },
        { new: true }
      );
      // If old bg image exists, delete it from S3
      if (user.bgImage) {
        try {
          await s3.send(
            new DeleteObjectCommand({
              Bucket: process.env.S3_BUCKET_NAME,
              Key: user.bgImage,
            })
          );
        } catch (deleteErr) {
          console.warn("Failed to delete old image:", deleteErr.message);
        }
      }
      user.bgImage = "";
      await user.save();
      return res.status(201).send(user);
    } catch (error) {
      console.error("Error in changeWallpaper:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // uploading custom bg image
  async changeBgImage(req, res) {
    try {
      // Check if Multer received the file
      if (!req.file) {
        return res.status(400).send({ message: "Image is required" });
      }

      // Extract file info from multer
      const file = req.file;

      // Generate unique file name
      const imageName = `${Date.now()}-${file.originalname}`;

      // Fetch user
      const user = await userModel.findById(req.user._id);
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      // If old bg image exists, delete it from S3
      if (user.bgImage) {
        try {
          await s3.send(
            new DeleteObjectCommand({
              Bucket: process.env.S3_BUCKET_NAME,
              Key: user.bgImage,
            })
          );
        } catch (deleteErr) {
          console.warn("Failed to delete old image:", deleteErr.message);
        }
      }

      // Upload new image to S3
      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: imageName,
          Body: file.buffer,
          ContentType: file.mimetype,
        })
      );

      // Update user's bgImage
      user.bgImage = imageName;
      await user.save();

      const imageParams = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: imageName, // Assuming imageUrl stores the S3 object key
        Expires: 604800, // URL expires in 1 hour
      };
      const command = new GetObjectCommand(imageParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 604800 });
      const imageURL = url;

      return res.status(201).json({
        success: true,
        message: "Background image updated successfully",
        bgImage: imageURL,
      });
    } catch (error) {
      console.error("Error in changeBgImage:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Forget Password
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const user = await userModel.findOne({ email });

      if (!user)
        return res
          .status(404)
          .json({ success: false, message: "User not found" });

      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString("hex");
      const resetTokenHash = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

      user.resetPasswordToken = resetTokenHash;
      user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // valid for 15 mins
      await user.save();

      // Send email
      const resetLink = `${CLIENT_URL}/reset-password?token=${resetToken}`;
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Sambandha Support" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "Password Reset Request",
        html: `
        <p>Hello ${user.name || "User"},</p>
        <p>You requested to reset your password. Click the link below to create a new password:</p>
        <a href="${resetLink}" target="_blank">${resetLink}</a>
        <p>This link will expire in 15 minutes.</p>
      `,
      });

      res.json({
        success: true,
        message: "Password reset link sent to your email.",
      });
    } catch (error) {
      console.error("Forgot Password Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Change Password
  async changePassword(req, res) {
    try {
      const resetTokenHash = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

      const user = await userModel.findOne({
        resetPasswordToken: resetTokenHash,
        resetPasswordExpire: { $gt: Date.now() },
      });

      if (!user)
        return res
          .status(400)
          .json({ success: false, message: "Invalid or expired token" });

      const { password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      res.json({ success: true, message: "Password reset successful." });
    } catch (error) {
      console.error("Reset Password Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new UserController();
