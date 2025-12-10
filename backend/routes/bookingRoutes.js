const express = require('express');
const router = express.Router();

const auth = require('../middleware/authMiddleware');
const validationHandler = require('../utils/validators/validationHandler');

const {
  createBookingValidator,
  cancelBookingValidator,
  updateBookingStatusValidator,
} = require('../utils/validators/bookingValidator');

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
  validationHandler,
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
  validationHandler,
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
  validationHandler,
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