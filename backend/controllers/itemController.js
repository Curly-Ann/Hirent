const Item = require("../models/Item");
const { RENTABLE_CATEGORIES } = require('../utils/constants');

// ------------------------
// GET SINGLE ITEM
// ------------------------
exports.getSingleItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('owner');
    if (!item) {
      return res.status(404).json({ success: false, msg: "Item not found" });
    }
    res.json({ success: true, item });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error fetching item" });
  }
};

// ------------------------
// GET ALL ITEMS
// ------------------------
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items); 
  } catch (err) {
    console.error("Error fetching items:", err);
    res.status(500).json({ message: "Error fetching items" });
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
      status: 'active'
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
    console.log("[CREATE ITEM] Request body:", req.body);
    console.log("[CREATE ITEM] Files:", req.files?.length || 0);

    const itemData = { ...req.body };
    itemData.owner = req.user.userId;

    if (itemData.itemName) {
      itemData.title = itemData.itemName;
    }

    const fieldsToParse = ['unavailableDates', 'itemOptions'];
    fieldsToParse.forEach(field => {
      if (itemData[field] && typeof itemData[field] === 'string') {
        try {
          itemData[field] = JSON.parse(itemData[field]);
        } catch (e) {
          console.error(`Failed to parse ${field}:`, e);
        }
      }
    });

    if (itemData.category) {
      itemData.category = itemData.category.charAt(0).toUpperCase() + itemData.category.slice(1);
    }

    if (req.files && req.files.length > 0) {
      itemData.images = req.files.map(file => {
        return `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
      });
    }

    if (!itemData.images || itemData.images.length === 0) {
      return res.status(400).json({
        success: false,
        msg: "At least one image is required."
      });
    }

    if (itemData.images.length > 5) {
      return res.status(400).json({
        success: false,
        msg: "You can upload a maximum of 5 images."
      });
    }

    const item = new Item(itemData);
    await item.save();
    
    res.status(201).json({
      success: true,
      _id: item._id,
      message: "Item created successfully",
      item: item
    });
  } catch (err) {
    console.error("[CREATE ITEM] Error:", err);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({
        success: false,
        msg: messages.join(', ')
      });
    }

    res.status(500).json({ 
      success: false,
      msg: "Error creating item",
      message: err.message 
    });
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
    // Parse JSON fields from FormData
    const updateData = {};
    
    // Handle all form fields
    for (const key in req.body) {
      if (key === 'owner') continue; // Don't allow owner change
      
      const value = req.body[key];
      // Try to parse JSON fields
      if (typeof value === 'string' && (value.startsWith('[') || value.startsWith('{'))) {
        try {
          updateData[key] = JSON.parse(value);
        } catch (e) {
          updateData[key] = value;
        }
      } else {
        updateData[key] = value;
      }
    }
    
    // Map itemName to title if provided
    if (updateData.itemName) {
      updateData.title = updateData.itemName;
    }

    // Handle new images if provided
    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map(file => {
        return `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
      });
    }

    const updated = await Item.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ 
        success: false,
        msg: "Item not found" 
      });
    }

    res.json({
      success: true,
      message: "Item updated successfully",
      item: updated
    });
  } catch (err) {
    console.error("[UPDATE ITEM] Error:", err);
    res.status(500).json({ 
      success: false,
      msg: "Update failed",
      message: err.message 
    });
  }
};

// ------------------------
// DELETE ITEM
// ------------------------
exports.deleteItem = async (req, res) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({ 
        success: false,
        msg: "Item not found" 
      });
    }

    res.json({ 
      success: true,
      msg: "Item deleted successfully",
      message: "Item deleted" 
    });
  } catch (err) {
    console.error("[DELETE ITEM] Error:", err);
    res.status(500).json({ 
      success: false,
      msg: "Delete failed",
      message: err.message 
    });
  }
};

// ------------------------
// UPDATE ITEM STATUS
// ------------------------
exports.updateItemStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Item.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, msg: "Item not found" });
    }

    res.json({ success: true, item: updated });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Status update failed" });
  }
};

// ------------------------
// GET RENTABLE CATEGORIES
// ------------------------
exports.getRentableCategories = (req, res) => {
  try {
    res.json({ success: true, categories: RENTABLE_CATEGORIES });
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Error fetching categories' });
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
      status: 'active'
    })
      .limit(12)
      .populate("category");

    res.json(items);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
