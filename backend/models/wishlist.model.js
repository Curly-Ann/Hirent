const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  }
}, { timestamps: true });

// prevent duplicate wishlist entries for same user+item
WishlistSchema.index({ userId: 1, itemId: 1 }, { unique: true });

module.exports = mongoose.model('Wishlist', WishlistSchema);
