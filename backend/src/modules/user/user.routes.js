const { Router } = require("express");
const authMiddleware = require("../../middlewares/authMiddleware.js");
const userController = require("./user.controller.js");

const multer = require("multer");

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/get/:userId", userController.getUserDetail);

router.put("/edit", authMiddleware, userController.editUserDetail);

router.post("/forgotPassword", userController.forgotPassword);
router.post("/resetPassword/:token", userController.changePassword);

router.put(
  "/changeWallpaper/:userId",
  authMiddleware,
  userController.changeWallpaper
);

router.put(
  "/changeBgImage",
  authMiddleware,
  upload.single("bgImage"),
  userController.changeBgImage
);

module.exports = router;
