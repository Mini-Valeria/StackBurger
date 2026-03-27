const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");

router.get("/orders", ordersController.getOrders);
router.post("/orders", ordersController.createOrder);
router.put('/orders/:id', ordersController.updateOrderStatus);
router.delete('/orders/:id', ordersController.deleteOrder);

module.exports = router;