const mongoose = require('mongoose');

const CollectionSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    unique: true
  },
  items: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Item' 
  }]
}, { timestamps: true });

module.exports = mongoose.model('Collection', CollectionSchema);
