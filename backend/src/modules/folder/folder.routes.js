const express = require("express");
const authMiddleware = require("../../middlewares/authMiddleware.js");
const folderController = require("./folder.controller.js");

const router = express.Router();

router.get("/", authMiddleware, folderController.getAllFolders);
router.get("/user/:userId", folderController.getUsersFolders);
router.get("/:id", folderController.getFolderById);
router.post("/", authMiddleware, folderController.createFolder);
router.put("/:id", authMiddleware, folderController.updateFolder);
router.delete("/:id", authMiddleware, folderController.deleteFolder);

module.exports = router;
