const Category = require("../models/Category");
const Item = require("../../models/Item");

// Get featured categories
exports.getFeaturedCategories = async (req, res) => {
  try {
    const categories = await Category.find({ featured: true });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get items by category slug with pagination
exports.getItemsByCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const category = await Category.findOne({ slug });
    if (!category) return res.status(404).json({ message: "Category not found" });

    const [items, total] = await Promise.all([
      Item.find({ category: category._id }).skip(skip).limit(limit).populate("category"),
      Item.countDocuments({ category: category._id })
    ]);

    res.json({ items, total, page, limit });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};