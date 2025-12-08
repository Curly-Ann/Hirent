const Item = require("../models/Item");

// ------------------------
// GET ALL ITEMS
// ------------------------
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching items" });
  }
};

// ------------------------
// SEARCH ITEMS
// ------------------------
exports.searchItems = async (req, res) => {
  try {
    const q = req.query.q || "";

    const items = await Item.find({
      title: { $regex: q, $options: "i" },
    })
      .limit(50)
      .populate("category");

    res.json(items);
  } catch (err) {
    res.status(500).json({ msg: "Search failed" });
  }
};

// ------------------------
// CREATE NEW ITEM (OWNER)
// ------------------------
exports.createItem = async (req, res) => {
  try {
    const item = new Item({
      ...req.body,
      owner: req.user.id,
    });

    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ msg: "Error creating item" });
  }
};

// ------------------------
// GET ITEMS BY OWNER
// ------------------------
exports.getItemsByOwner = async (req, res) => {
  try {
    const items = await Item.find({ owner: req.params.ownerId });
    res.json(items);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching owner items" });
  }
};

// ------------------------
// UPDATE ITEM
// ------------------------
exports.updateItem = async (req, res) => {
  try {
    const updated = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: "Update failed" });
  }
};

// ------------------------
// DELETE ITEM
// ------------------------
exports.deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ msg: "Item deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Delete failed" });
  }
};

// ------------------------
// FEATURED ITEMS
// ------------------------
exports.getFeaturedItems = async (req, res) => {
  try {
    const items = await Item.find({
      featured: true,
      available: true,
    })
      .limit(12)
      .populate("category");

    res.json(items);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
