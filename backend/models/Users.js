const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, minlength: 6 }, // Optional for Google OAuth users
  googleId: { type: String, sparse: true, unique: true }, // Google OAuth ID
  avatar: { type: String }, // Profile picture from Google
  role: {
    type: String,
    enum: ['renter', 'owner', 'admin'],
    default: 'renter'
  },
  authProvider: {
    type: String,
    enum: ['email', 'google'],
    default: 'email'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
