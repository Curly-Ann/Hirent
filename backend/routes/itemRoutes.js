const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/itemController");
const auth = require("../middleware/authMiddleware");

// PUBLIC
router.get("/search", itemsController.searchItems);
router.get("/", itemsController.getAllItems);

// OWNER ROUTES
router.post("/", auth, itemsController.createItem);
router.get("/owner/:ownerId", auth, itemsController.getItemsByOwner);
router.put("/:id", auth, itemsController.updateItem);
router.delete("/:id", auth, itemsController.deleteItem);

module.exports = router;
