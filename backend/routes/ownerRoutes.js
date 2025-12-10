const express = require("express");
const router = express.Router();
const ownerController = require("../controllers/ownerController");
const authMiddleware = require("../middleware/authMiddleware");

// Protected routes (require authentication)
// Get owner stats
router.get(
  "/stats",
  authMiddleware,
  ownerController.getStats
);

module.exports = router;
