// Get featured items
exports.getFeaturedItems = async (req, res) => {
  try {
    const items = await Item.find({ featured: true, available: true }).limit(12).populate("category");
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
    }).limit(50).populate("category");

    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
