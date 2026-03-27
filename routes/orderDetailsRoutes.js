const express = require("express");
const router = express.Router();
const orderDetailsController = require("../controllers/orderDetailsController");

router.get("/order-details", orderDetailsController.getOrderDetails);

router.post("/order-details", orderDetailsController.createOrderDetail);

module.exports = router;