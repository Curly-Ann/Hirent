const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 60000, // Increased timeout to 60 seconds
      socketTimeoutMS: 120000, // Increased socket timeout to 2 minutes
      connectTimeoutMS: 60000, // Initial connection timeout
      maxPoolSize: 5, // Reduced pool size to prevent exhaustion
      minPoolSize: 1, // Keep minimal connections
      maxIdleTimeMS: 30000, // Close idle connections after 30 seconds
      heartbeatFrequencyMS: 10000, // Check connection health every 10 seconds
      retryWrites: true,
      retryReads: true,
      w: 'majority',
    });
    console.log('✅ MongoDB connected successfully!');
  } catch (err) {
    console.error('❌ MongoDB Connection Failed:', err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
