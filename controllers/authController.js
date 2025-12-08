const Item = require('../models/Items');

// GET ALL ITEMS
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find().limit(50);
    res.status(200).json({ success: true, count: items.length, items });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// CREATE NEW ITEM (OWNER)
const createItem = async (req, res) => {
  try {
    const itemData = {
      ...req.body,
      ownerId: req.user.id      // Important!
    };

    const newItem = new Item(itemData);
    await newItem.save();

    res.status(201).json({ success: true, item: newItem });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to create item" });
  }
};

// GET ITEMS BY OWNER
const getItemsByOwner = async (req, res) => {
  try {
    const ownerId = Number(req.params.ownerId);

    const items = await Item.find({ ownerId });

    res.status(200).json({ success: true, items });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch owner items" });
  }
};

// UPDATE ITEM
const updateItem = async (req, res) => {
  try {
    const updated = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({ success: true, item: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to update item" });
  }
};

// DELETE ITEM
const deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Item deleted" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to delete item" });
  }
};

module.exports = {
  getAllItems,
  createItem,
  searchItems,
  getItemsByOwner,
  updateItem,
  deleteItem
};
