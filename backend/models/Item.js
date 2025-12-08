const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({

  title: { type: String, required: true },
  description: String,

  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true 
  },

  images: [{ type: String }],
  pricePerDay: Number,
  available: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },

  // REQUIRED FOR OWNER DASHBOARD
  ownerId: { 
    type: Number,    // JWT uses numeric IDs
    required: true 
  }

}, { timestamps: true });

ItemSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("Item", ItemSchema);
