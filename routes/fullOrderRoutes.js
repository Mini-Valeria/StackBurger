const express = require("express");
const router = express.Router();
const fullOrderController = require("../controllers/fullOrderController");

router.post("/create-full-order", fullOrderController.createFullOrder);

module.exports = router;