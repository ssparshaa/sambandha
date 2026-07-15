const { Router } = require("express");
const memoryCardController = require("./memoryCard.controller.js");
const authMiddleware = require("../../middlewares/authMiddleware.js");
const multer = require("multer");

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// get memory cards
router.get("/get/:userId", memoryCardController.fetchMemoryCard);

// get single memory card
router.get("/get/single/:userId", memoryCardController.fetchSingleMemoryCard);

// get memory cards by folder
router.get("/get/byFolder/:folderId", memoryCardController.fetchMemoryCardByFolder);

// create memory card
router.post(
  "/create/:userId",
  authMiddleware,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  memoryCardController.createMemoryCard
);

// 2️⃣ Edit Memory Card (with optional image/audio)
router.put(
  "/edit/:memoryCardId",
  authMiddleware,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  memoryCardController.editMemoryCard
);

// 3️⃣ Delete Memory Card
router.delete(
  "/delete/:memoryCardId",
  authMiddleware,
  memoryCardController.deleteMemoryCard
);

module.exports = router;
