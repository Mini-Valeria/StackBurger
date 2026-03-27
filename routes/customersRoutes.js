const express = require("express");
const router = express.Router();
const customersController = require("../controllers/customersController");

router.get("/customers", customersController.getCustomers);
router.post("/customers", customersController.createCustomer);

module.exports = router;