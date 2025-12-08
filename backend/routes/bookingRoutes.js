const express = require('express');
const router = express.Router();

const auth = require('../middleware/authMiddleware');

const {
  createBookingValidator,
  cancelBookingValidator,
  updateBookingStatusValidator,
} = require('../validators/bookingValidator');

const {
  createBooking,
  getMyBookings,
  cancelBooking,
  getBookingsForMyItems,
  updateBookingStatus,
  getBookingById,
} = require('../controllers/bookingController');

// ============================
// RENTER ROUTES
// ============================

// Create booking
router.post(
  '/',
  auth,
  createBookingValidator,
  createBooking
);

// Get my bookings (renter)
router.get(
  '/me',
  auth,
  getMyBookings
);

// Cancel booking
router.put(
  '/:id/cancel',
  auth,
  cancelBookingValidator,
  cancelBooking
);

// ============================
// OWNER ROUTES
// ============================

// Get bookings for items I own
router.get(
  '/owner',
  auth,
  getBookingsForMyItems
);

// Owner approve/reject booking
router.put(
  '/:id/status',
  auth,
  updateBookingStatusValidator,
  updateBookingStatus
);

// ============================
// GENERAL ROUTE
// ============================

// Single booking details
router.get(
  '/:id',
  auth,
  getBookingById
);

module.exports = router;