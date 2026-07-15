const MemoryCard = require("../../models/memoryCardModel.js");
const {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const s3 = require("../../config/s3Config.js");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const memoryCardModel = require("../../models/memoryCardModel.js");
const userModel = require("../../models/userModel.js");
const sharp = require("sharp");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
const fs = require("fs");
const path = require("path");
const os = require("os");

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const tempDir = os.tmpdir(); // system temp directory (safe cross-platform)

class MemoryCardController {
  async createMemoryCard(req, res) {
    try {
      const { title, description, date, folderId } = req.body;
      const { userId } = req.params;
      const memoryCards = await memoryCardModel.find({ user: userId });
      const userData = await userModel.findById(userId);

      // if (memoryCards.length >= 5) {
      if (memoryCards.length >= (userData.memoryCardLimit || 50)) {
        return res.status(403).json({
          message:
            "Memory card limit reached. Please upgrade your plan to add more memory cards.",
        });
      }

      // Validate required fields
      if (!title || !date) {
        return res.status(400).json({ message: "Title and date are required fields" });
      }

      if (!req.files.image) {
        return res.status(400).json({ message: "Image is required" });
      }

      // Ensure user is authenticated
      let user = req.user;
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      if (userId) {
        user = userId;
      }
      let imageName, audioName;

      // Upload Image if exists
      if (req.files?.image) {
        const imageFile = req.files.image[0];

        // Compress & resize image using sharp with EXIF orientation handling
        const compressedBuffer = await sharp(imageFile.buffer)
          .rotate() // Auto-rotate based on EXIF orientation
          .resize({ width: 1080 }) // resize max width to 1080px (optional)
          .jpeg({ quality: 50 }) // compress JPEG with 50% quality
          .toBuffer();

        imageName =
          Date.now().toString() + "-" + req.files.image[0].originalname;
        const imageParams = {
          Bucket: process.env.S3_BUCKET_NAME,
          Key: imageName,
          Body: compressedBuffer,
          ContentType: req.files.image[0].mimetype,
        };
        await s3.send(new PutObjectCommand(imageParams));
      }

      // Upload Audio if exists
      if (req.files?.audio) {
        const audioFile = req.files.audio[0];
        const inputPath = path.join(tempDir, `${Date.now()}-input.webm`);
        const outputPath = path.join(tempDir, `${Date.now()}-compressed.mp3`);

        fs.writeFileSync(inputPath, audioFile.buffer);

        await new Promise((resolve, reject) => {
          ffmpeg(inputPath)
            .audioBitrate("96k") // lower bitrate to reduce file size
            .toFormat("mp3")
            .save(outputPath)
            .on("end", resolve)
            .on("error", reject);
        });

        const compressedBuffer = fs.readFileSync(outputPath);

        audioName = `${Date.now()}-${audioFile.originalname.replace(
          /\s+/g,
          "_"
        )}`;
        const audioParams = {
          Bucket: process.env.S3_BUCKET_NAME,
          Key: audioName,
          Body: compressedBuffer,
          ContentType: audioFile.mimetype,
        };

        await s3.send(new PutObjectCommand(audioParams));

        // Clean up temporary files
        fs.unlinkSync(inputPath);
        fs.unlinkSync(outputPath);
      }

      // Save MemoryCard to Database
      const memoryCard = await MemoryCard.create({
        title,
        description: description || "",
        image: imageName || null,
        audio: audioName || null,
        date,
        user,
        folder: folderId || null,
      });

      return res.status(201).json({
        message: "Memory card created successfully",
        memoryCard,
      });
    } catch (error) {
      console.error("Error creating memory card:", error);
      return res.status(500).json({ message: "Internal server error", error });
    }
  }

  async fetchMemoryCard(req, res) {
    try {
      const { userId } = req.params;
      if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
      }
      const memoryCards = await memoryCardModel.find({ user: userId });

      if (!memoryCards.length) {
        return res
          .status(404)
          .json({ message: "No memory cards found for this user." });
      }

      const updatedMemoryCards = await Promise.all(
        memoryCards.map(async (card) => {
          let updatedCard = { ...card._doc }; // Convert Mongoose object to plain JS object

          if (card.image) {
            const imageParams = {
              Bucket: process.env.S3_BUCKET_NAME,
              Key: card.image, // Assuming imageUrl stores the S3 object key
              Expires: 604800, // URL expires in 1 hour
            };
            const command = new GetObjectCommand(imageParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 604800 });
            updatedCard.image = url;
          }

          if (card.audio) {
            const audioParams = {
              Bucket: process.env.S3_BUCKET_NAME,
              Key: card.audio, // Assuming audioUrl stores the S3 object key
              Expires: 604800,
            };
            const command = new GetObjectCommand(audioParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 604800 });
            updatedCard.audio = url;
          }
          return updatedCard;
        })
      );

      return res.status(200).json(updatedMemoryCards);
    } catch (error) {
      console.error("Error fetching memory cards:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async fetchSingleMemoryCard(req, res) {
    try {
      const { userId } = req.params;
      const { memoryCardId } = req.query;

      if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
      }
      const memoryCards = await memoryCardModel.findById(memoryCardId);

      if (!memoryCards) {
        return res
          .status(404)
          .json({ message: "No memory cards found for this user." });
      }

      if (memoryCards.user.toString() !== userId && user.role !== "admin") {
        return res.status(403).json({
          message: "You are not authorized to view this memory card.",
        });
      }

      const updatedMemoryCards = { ...memoryCards._doc }; // Convert Mongoose object to plain JavaScript object

      if (memoryCards.image) {
        const imageParams = {
          Bucket: process.env.S3_BUCKET_NAME,
          Key: memoryCards.image, // Assuming imageUrl stores the S3 object key
          Expires: 604800, // URL expires in 1 hour
        };
        const command = new GetObjectCommand(imageParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 604800 });
        updatedMemoryCards.image = url;
      }
      if (memoryCards.audio) {
        const audioParams = {
          Bucket: process.env.S3_BUCKET_NAME,
          Key: memoryCards.audio, // Assuming audioUrl stores the S3 object key
          Expires: 604800,
        };
        const command = new GetObjectCommand(audioParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 604800 });
        updatedMemoryCards.audio = url;
      }

      return res.status(200).json(updatedMemoryCards);
    } catch (error) {
      console.error("Error fetching memory cards:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async fetchMemoryCardByFolder(req, res) {
    try {
      const { folderId } = req.params;
      if (!folderId) {
        return res.status(400).json({ message: "Folder ID is required." });
      }
      const memoryCards = await memoryCardModel.find({ folder: folderId });

      if (!memoryCards.length) {
        return res
          .status(404)
          .json({ message: "No memory cards found for this folder." });
      }
      return res.status(200).json(memoryCards);
    } catch (error) {
      console.error("Error fetching memory cards by folder:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async editMemoryCard(req, res) {
    try {
      const { memoryCardId } = req.params; // ID of memory card to edit
      const { title, description, date } = req.body;

      // Validate required fields
      if (!title || !date) {
        return res.status(400).json({ message: "Title and date are required fields" });
      }

      // Ensure user is authenticated
      const user = req.user;
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Find existing memory card
      const memoryCard = await MemoryCard.findById(memoryCardId);
      if (!memoryCard) {
        return res.status(404).json({ message: "Memory card not found" });
      }

      // Check ownership (optional, depending on your rules)
      if (
        memoryCard.user.toString() !== user._id.toString() &&
        user.role !== "admin"
      ) {
        return res.status(403).json({ message: "Forbidden" });
      }

      let imageName = memoryCard.image;
      let audioName = memoryCard.audio;

      // =====================
      // 🖼️ Handle New Image
      // =====================
      if (req.files?.image) {
        // Delete old image if exists
        if (imageName) {
          await s3.send(
            new DeleteObjectCommand({
              Bucket: process.env.S3_BUCKET_NAME,
              Key: imageName,
            })
          );
        }

        // Compress image using sharp with EXIF orientation handling
        const compressedBuffer = await sharp(req.files.image[0].buffer)
          .rotate() // Auto-rotate based on EXIF orientation
          .resize({ width: 1080 }) // optional resize
          .jpeg({ quality: 50 }) // compress quality
          .toBuffer();

        imageName = `${Date.now()}-${req.files.image[0].originalname}`;

        await s3.send(
          new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: imageName,
            Body: compressedBuffer,
            ContentType: req.files.image[0].mimetype,
          })
        );
      }

      // =====================
      // 🎙️ Handle New Audio
      // =====================
      if (req.files?.audio) {
        // Delete old audio if exists
        if (audioName) {
          await s3.send(
            new DeleteObjectCommand({
              Bucket: process.env.S3_BUCKET_NAME,
              Key: audioName,
            })
          );
        }

        // Optional: limit audio size (20 seconds usually < 500KB for webm)
        const audioFile = req.files.audio[0];
        const inputPath = path.join(tempDir, `${Date.now()}-input.webm`);
        const outputPath = path.join(tempDir, `${Date.now()}-compressed.mp3`);

        fs.writeFileSync(inputPath, audioFile.buffer);

        await new Promise((resolve, reject) => {
          ffmpeg(inputPath)
            .audioBitrate("96k") // lower bitrate to reduce file size
            .toFormat("mp3")
            .save(outputPath)
            .on("end", resolve)
            .on("error", reject);
        });

        const compressedBuffer = fs.readFileSync(outputPath);

        // const maxSize = 500 * 1024; // ~500KB limit

        // if (audioFile.size > maxSize) {
        //   return res.status(400).json({
        //     message:
        //       "Audio file too large. Please record less than 20 seconds.",
        //   });
        // }

        audioName = `${Date.now()}-${audioFile.originalname}`;
        await s3.send(
          new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: audioName,
            Body: compressedBuffer,
            ContentType: audioFile.mimetype,
          })
        );
      }

      // =====================
      // ✅ Update DB
      // =====================
      memoryCard.image = imageName;
      memoryCard.audio = audioName;
      memoryCard.title = req.body.title || memoryCard.title;
      // Description is optional - only update if explicitly provided in request
      if (req.body.description !== undefined) {
        memoryCard.description = req.body.description || "";
      }

      await memoryCard.save();

      return res.status(200).json({
        message: "Memory card updated successfully",
        memoryCard,
      });
    } catch (error) {
      console.error("Error editing memory card:", error);
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  }

  async deleteMemoryCard(req, res) {
    try {
      const { memoryCardId } = req.params;
      if (!memoryCardId)
        return res.status(400).json({ message: "Memory card ID is required." });

      const memoryCard = await MemoryCard.findById(memoryCardId);
      if (!memoryCard)
        return res.status(404).json({ message: "Memory card not found." });

      if (
        req.user.role === "admin" ||
        req.user.id === memoryCard.user.toString()
      ) {
        // Delete S3 files first
        try {
          if (memoryCard.image) {
            await s3.send(
              new DeleteObjectCommand({
                Bucket: process.env.S3_BUCKET_NAME,
                Key: memoryCard.image,
              })
            );
          }
          if (memoryCard.audio) {
            await s3.send(
              new DeleteObjectCommand({
                Bucket: process.env.S3_BUCKET_NAME,
                Key: memoryCard.audio,
              })
            );
          }
        } catch (s3Error) {
          console.error("S3 deletion error:", s3Error);
        }

        // Delete DB entry
        await MemoryCard.findByIdAndDelete(memoryCardId);

        return res
          .status(200)
          .json({ message: "Memory card deleted successfully." });
      } else {
        return res.status(403).json({
          message: "You are not authorized to delete this memory card.",
        });
      }
    } catch (error) {
      console.error("Error deleting memory card:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = new MemoryCardController();
