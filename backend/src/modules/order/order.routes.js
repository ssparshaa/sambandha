const { Router } = require("express");
const orderController = require("./order.controller.js");

const router = Router();

router.post("/", orderController.makeOrder);
router.get("/", orderController.getOrder);
router.put("/status/:orderId", orderController.updateOrderStatus);
router.put("/update/:orderId", orderController.updateOrderDetails);
router.delete("/status/:orderId", orderController.deleteOrderStatus);
module.exports = router;
