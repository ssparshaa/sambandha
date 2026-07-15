const { Router } = require("express");
const adminMiddleware = require("../../middlewares/adminMiddleware.js");
const adminController = require("./admin.controller.js");

const router = Router();

router.get("/getUsers", adminController.getUsers);
router.post("/createUser", adminMiddleware, adminController.createUser);
router.delete("/deleteUser/:id", adminMiddleware, adminController.deleteUser);

module.exports = router;
