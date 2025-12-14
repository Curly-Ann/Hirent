// Admin routes for dashboard operations
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');

// Middleware to verify admin role
const verifyAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      msg: "Access denied. Admin role required.",
    });
  }
  next();
};

// Dashboard statistics
router.get('/dashboard/stats', auth, verifyAdmin, adminController.getDashboardStats);

// User management
router.get('/users', auth, verifyAdmin, adminController.getAllUsers);
router.put('/users/:userId/status', auth, verifyAdmin, adminController.suspendUser);

// Item oversight
router.get('/items', auth, verifyAdmin, adminController.getAllItems);
router.delete('/items/:itemId', auth, verifyAdmin, adminController.removeItem);

// Bookings overview
router.get('/bookings', auth, verifyAdmin, adminController.getAllBookings);

// Reports management
router.get('/reports', auth, verifyAdmin, adminController.getAllReports);
router.put('/reports/:reportId', auth, verifyAdmin, adminController.updateReportStatus);

module.exports = router;
