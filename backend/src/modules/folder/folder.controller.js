const Folder = require("../../models/folderModel.js");
const MemoryCard = require("../../models/memoryCardModel.js");
const {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const s3 = require("../../config/s3Config.js");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const bcrypt = require("bcryptjs");

class FolderController {
  // ✅ Fetch all folders for logged in user
  async getAllFolders(req, res) {
    try {
      const userId = req.user._id;
      // Fetch folders for logged-in user
      const folders = await Folder.find({ user: userId })
        .sort({
          createdAt: -1,
        })
        .populate("user", "name email wallpaper");

      // Add memories count for each folder
      const foldersWithCounts = await Promise.all(
        folders.map(async (folder) => {
          const count = await MemoryCard.countDocuments({
            folder: folder._id,
          });

          // Return folder with an extra field
          return {
            ...folder.toObject(), // Convert Mongoose document to plain JS object
            count,
          };
        })
      );

      res.status(200).json({
        success: true,
        folders: foldersWithCounts,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Failed to fetch folders", error });
    }
  }

  async getUsersFolders(req, res) {
    try {
      const { userId } = req.params;
      // Fetch folders for logged-in user
      const folders = await Folder.find({ user: userId })
        .sort({
          createdAt: -1,
        })
        .populate("user", "name email wallpaper");

      // Add memories count for each folder
      const foldersWithCounts = await Promise.all(
        folders.map(async (folder) => {
          const count = await MemoryCard.countDocuments({
            folder: folder._id,
          });

          // Return folder with an extra field
          return {
            ...folder.toObject(), // Convert Mongoose document to plain JS object
            count,
          };
        })
      );

      res.status(200).json({
        success: true,
        folders: foldersWithCounts,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Failed to fetch folders", error });
    }
  }

  // ✅ Fetch single folder by ID
  async getFolderById(req, res) {
    try {
      let folder = await Folder.findById(req.params.id);
      if (!folder) {
        return res
          .status(404)
          .json({ success: false, message: "Folder not found" });
      }

      const memoryCards = await MemoryCard.find({ folder: folder._id });

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
      res.status(200).json({ success: true, folder, updatedMemoryCards });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Failed to fetch folder", error });
    }
  }

  // ✅ Create new folder
  async createFolder(req, res) {
    try {
      const { name, color } = req.body;
      // const { name, color, isPrivate, password } = req.body;

      const folderData = {
        name,
        color,
        // isPrivate,
        user: req.user._id,
      };

      // If folder is private, hash the password - COMMENTED OUT
      // if (isPrivate && password) {
      //   const salt = await bcrypt.genSalt(10);
      //   folderData.password = await bcrypt.hash(password, salt);
      // }

      const newFolder = await Folder.create(folderData);
      res
        .status(201)
        .json({ success: true, message: "Folder created", folder: newFolder });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Failed to create folder", error });
    }
  }

  // ✅ Edit folder
  async updateFolder(req, res) {
    try {
      const { name, color } = req.body;
      // const { name, color, isPrivate, password } = req.body;
      let updateData = { name, color };
      // let updateData = { name, color, isPrivate };

      // Update password only if provided - COMMENTED OUT
      // if (isPrivate && password) {
      //   const salt = await bcrypt.genSalt(10);
      //   updateData.password = await bcrypt.hash(password, salt);
      // } else if (!isPrivate) {
      //   updateData.password = null; // Remove password if folder is made public
      // }

      const folder = await Folder.findByIdAndUpdate(req.params.id, updateData, {
        new: true,
      });
      if (!folder) {
        return res
          .status(404)
          .json({ success: false, message: "Folder not found" });
      }

      res
        .status(200)
        .json({ success: true, message: "Folder updated", folder });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Failed to update folder", error });
    }
  }

  // ✅ Delete folder and all associated memory cards and S3 files
  async deleteFolder(req, res) {
    try {
      const folder = await Folder.findById(req.params.id);
      if (!folder) {
        return res
          .status(404)
          .json({ success: false, message: "Folder not found" });
      }

      // Find all memory cards in this folder
      const memoryCards = await MemoryCard.find({ folder: folder._id });

      // Delete all image and audio files from S3
      for (const card of memoryCards) {
        try {
          // Delete image from S3 if it exists
          if (card.image) {
            const deleteImageParams = {
              Bucket: process.env.S3_BUCKET_NAME,
              Key: card.image,
            };
            const deleteImageCommand = new DeleteObjectCommand(
              deleteImageParams
            );
            await s3.send(deleteImageCommand);
          }

          // Delete audio from S3 if it exists
          if (card.audio) {
            const deleteAudioParams = {
              Bucket: process.env.S3_BUCKET_NAME,
              Key: card.audio,
            };
            const deleteAudioCommand = new DeleteObjectCommand(
              deleteAudioParams
            );
            await s3.send(deleteAudioCommand);
          }
        } catch (s3Error) {
          console.error(
            `Error deleting S3 file for memory card ${card._id}:`,
            s3Error
          );
          // Continue with deletion even if S3 deletion fails
        }
      }

      // Delete all memory cards from database
      await MemoryCard.deleteMany({ folder: folder._id });

      // Finally, delete the folder itself
      await Folder.findByIdAndDelete(req.params.id);

      res
        .status(200)
        .json({
          success: true,
          message: "Folder and all contents deleted successfully",
        });
    } catch (error) {
      console.error("Error deleting folder:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to delete folder", error });
    }
  }
}

module.exports = new FolderController();
