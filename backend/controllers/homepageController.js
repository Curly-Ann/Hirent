const Item = require("../models/Item");

// GET featured categories (placeholder)
exports.getFeaturedCategories = async (req, res) => {
  try {
    // placeholder example
    res.json([
      { name: "Photography", slug: "photography" },
      { name: "Sports", slug: "sports" },
      { name: "Tools", slug: "tools" }
    ]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET items by category slug
exports.getItemsByCategory = async (req, res) => {
  try {
    const slug = req.params.slug;
    const items = await Item.find({ categorySlug: slug });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET featured items
exports.getFeaturedItems = async (req, res) => {
  try {
    const items = await Item.find({ featured: true }).limit(12);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Search items
exports.searchItems = async (req, res) => {
  try {
    const q = req.query.q || "";
    const items = await Item.find({
      title: { $regex: q, $options: "i" }
    }).limit(50);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// GET PERSONALIZED HOMEPAGE - For authenticated users
exports.getPersonalizedHomepage = async (req, res) => {
  try {
    const personalized = {
      userLocation: { city: 'Your City', country: 'Your Country' },
      categoryPreferences: [],
      recommended: [],
      nearbyItems: []
    };
    res.json({ success: true, data: personalized });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
};
