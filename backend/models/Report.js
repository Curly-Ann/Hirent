// Report model for user submissions
const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  reporterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reportedUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  reportedItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
  },
  reportedBookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
  },
  reportType: {
    type: String,
    enum: ['user', 'item', 'booking'],
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'resolved', 'dismissed'],
    default: 'pending',
  },
  adminNotes: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.models.Report || mongoose.model('Report', ReportSchema);
