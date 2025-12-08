const express = require("express");
const router = express.Router();
const Wishlist = require("../models/wishlist.model");
const Item = require("../models/Item");
const auth = require("../middleware/authMiddleware");

// ADD ITEM
router.post("/", auth, async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware
    const { itemId } = req.body;

    // Check if item exists
    const itemExists = await Item.findById(itemId);
    if (!itemExists) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Create new wishlist entry
    const entry = await Wishlist.create({ userId, itemId });

    return res.status(201).json({
      message: "Item added to wishlist",
      wishlist: entry,
    });
  } catch (error) {
    // Duplicate handling
    if (error.code === 11000) {
      return res.status(400).json({ message: "Item already in wishlist" });
    }

    return res.status(500).json({ message: error.message });
  }
});

// REMOVE ITEM
router.delete("/:itemId", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.params;

    const removed = await Wishlist.findOneAndDelete({ userId, itemId });

    if (!removed) {
      return res.status(404).json({ message: "Item not found in wishlist" });
    }

    return res.json({ message: "Item removed from wishlist" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// FETCH USER WISHLIST
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const wishlist = await Wishlist.find({ userId }).populate("itemId"); // frontend: title, images, pricePerDay, etc.

    return res.json(wishlist);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;