const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/itemController");
const auth = require("../middleware/authMiddleware");
const multer = require("multer");
const validationHandler = require("../validators/validationHandler");
const {
  createItemValidator,
  updateItemValidator,
} = require("../validators/itemValidator");

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// OWNER ROUTES with Validation (MUST come before generic /:id route)
router.get("/owner/:ownerId", auth, itemsController.getItemsByOwner);

// PUBLIC
router.get("/categories", itemsController.getRentableCategories);
router.get("/search", itemsController.searchItems);
router.get("/", (req, res, next) => {
  console.log("STEP 1: /api/items route entered");
  itemsController.getAllItems(req, res, next);
});

// GENERIC ITEM ROUTES (must come after specific routes)
router.post("/", auth, upload.array("images", 10), createItemValidator, validationHandler, itemsController.createItem);
router.get("/:id", itemsController.getSingleItem);
router.put("/:id", auth, upload.array("images", 10), updateItemValidator, validationHandler, itemsController.updateItem);
router.delete("/:id", auth, itemsController.deleteItem);
router.patch("/:id/status", auth, itemsController.updateItemStatus);

module.exports = router;
