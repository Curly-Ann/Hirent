const Item = require("../models/Item");
const { RENTABLE_CATEGORIES } = require('../utils/constants');

/* =====================================================
   GET SINGLE ITEM (FULL DATA – INCLUDING IMAGES)
   ===================================================== */
exports.getSingleItem = async (req, res) => {
  try {
    const item = await Item
      .findById(req.params.id)
      .populate('owner')
      .lean();

    if (!item) {
      return res.status(404).json({ success: false, msg: "Item not found" });
    }

    // NO CACHE for item details - always fresh
    res.set("Cache-Control", "no-cache, no-store, must-revalidate");
    res.json({ success: true, item });
  } catch (err) {
    console.error("[GET SINGLE ITEM]", err);
    res.status(500).json({ success: false, msg: "Error fetching item" });
  }
};

/* =====================================================
   GET ALL ITEMS (BROWSE – NO IMAGES, FAST)
   ===================================================== */
exports.getAllItems = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;

    console.time("[GET ALL ITEMS] Query Time");
    
    // Only fetch active items for browse
    const items = await Item.find({ status: 'active' })
      .select("title pricePerDay location images rating status _id category")
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()
      .exec();
    
    console.timeEnd("[GET ALL ITEMS] Query Time");
    console.log(`[GET ALL ITEMS] Found ${items.length} items on page ${page}`);

    const sanitized = items.map(item => ({
      _id: item._id,
      title: item.title,
      pricePerDay: item.pricePerDay,
      location: item.location,
      rating: item.rating,
      status: item.status,
      category: item.category,
      images: item.images?.length ? [item.images[0]] : []
    }));

    // HTTP Cache Headers for Browse List
    res.set("Cache-Control", "public, max-age=120, stale-while-revalidate=300");
    res.json({ success: true, items: sanitized });

  } catch (err) {
    console.error("[GET ALL ITEMS] Error:", err.message);
    console.error("[GET ALL ITEMS] Stack:", err.stack);
    res.status(500).json({
      success: false,
      msg: "Error fetching items",
      error: err.message
    });
  }
};

/* =====================================================
   SEARCH ITEMS (NO IMAGES)
   ===================================================== */
exports.searchItems = async (req, res) => {
  try {
    const q = req.query.q || "";

    const items = await Item.find({
      title: { $regex: q, $options: "i" },
      status: "active"
    })
      .select("-images")
      .limit(50)
      .lean();

    res.json({ success: true, items });
  } catch (err) {
    console.error("[SEARCH ITEMS]", err);
    res.status(500).json({ msg: "Search failed" });
  }
};

/* =====================================================
   CREATE ITEM (OWNER)
   ===================================================== */
exports.createItem = async (req, res) => {
  try {
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
        } catch {}
      }
    });

    if (req.files && req.files.length > 0) {
      itemData.images = req.files.map(file =>
        `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
      );
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
        msg: "Maximum of 5 images allowed."
      });
    }

    const item = new Item(itemData);
    await item.save();

    res.status(201).json({
      success: true,
      message: "Item created successfully",
      item
    });

  } catch (err) {
    console.error("[CREATE ITEM]", err);
    res.status(500).json({
      success: false,
      msg: "Error creating item"
    });
  }
};

/* =====================================================
   GET ITEMS BY OWNER (NO IMAGES – FAST DASHBOARD)
   ===================================================== */
exports.getItemsByOwner = async (req, res) => {
  try {
    const items = await Item.find({ owner: req.params.ownerId })
      .select("_id title pricePerDay location images category status views totalBookings createdAt updatedAt availability")
      .lean();

    // Transform items to include only first image as thumbnail
    const sanitized = items.map(item => ({
      ...item,
      images: item.images?.length ? [item.images[0]] : []
    }));

    // Add safe HTTP cache headers for owner listings (private, short TTL)
    res.set("Cache-Control", "private, max-age=30, stale-while-revalidate=60");
    res.json({ success: true, items: sanitized });
  } catch (err) {
    console.error("[GET ITEMS BY OWNER]", err);
    res.status(500).json({ msg: "Error fetching owner items" });
  }
};

/* =====================================================
   UPDATE ITEM
   ===================================================== */
exports.updateItem = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map(file =>
        `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
      );
    }

    const updated = await Item.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).lean();

    if (!updated) {
      return res.status(404).json({ success: false, msg: "Item not found" });
    }

    res.json({
      success: true,
      message: "Item updated successfully",
      item: updated
    });

  } catch (err) {
    console.error("[UPDATE ITEM]", err);
    res.status(500).json({ msg: "Update failed" });
  }
};

/* =====================================================
   DELETE ITEM
   ===================================================== */
exports.deleteItem = async (req, res) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, msg: "Item not found" });
    }

    res.json({ success: true, msg: "Item deleted successfully" });

  } catch (err) {
    console.error("[DELETE ITEM]", err);
    res.status(500).json({ msg: "Delete failed" });
  }
};

/* =====================================================
   UPDATE ITEM STATUS
   ===================================================== */
exports.updateItemStatus = async (req, res) => {
  try {
    const updated = await Item.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    ).lean();

    if (!updated) {
      return res.status(404).json({ success: false, msg: "Item not found" });
    }

    res.json({ success: true, item: updated });
  } catch (err) {
    res.status(500).json({ msg: "Status update failed" });
  }
};

/* =====================================================
   GET RENTABLE CATEGORIES
   ===================================================== */
exports.getRentableCategories = (req, res) => {
  res.json({ success: true, categories: RENTABLE_CATEGORIES });
};

/* =====================================================
   FEATURED ITEMS (NO IMAGES)
   ===================================================== */
exports.getFeaturedItems = async (req, res) => {
  try {
    const items = await Item.find({
      featured: true,
      status: 'active'
    })
      .select("-images")
      .limit(12)
      .lean();

    res.json({ success: true, items });
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch featured items" });
  }
};
