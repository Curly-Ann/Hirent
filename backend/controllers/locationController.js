// Simple placeholder location controller
// Implement real logic as needed (DB model, geospatial queries)

exports.addLocation = async (req, res) => {
  try {
    // placeholder: accept payload but do not persist
    const payload = req.body || {};
    return res.status(201).json({ message: 'Location received (placeholder)', data: payload });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getNearbyLocations = async (req, res) => {
  try {
    // placeholder: return empty list
    return res.json([]);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
