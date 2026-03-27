const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/sync-user", userController.syncUser);

module.exports = router;