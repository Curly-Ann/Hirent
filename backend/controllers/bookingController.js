const Booking = require('../models/Booking');
const Item = require('../models/Item');
const { createNotification } = require('./notificationController');
const dayjs = require('dayjs');

// ================================
// CREATE BOOKING
// ================================
exports.createBooking = async (req, res) => {
  try {
    const {
      itemId, startDate, endDate, totalAmount, subtotal,
      shippingFee, discount, deliveryMethod, couponCode
    } = req.body;
    const renterId = req.user.userId;

    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ success: false, msg: 'Item not found' });

    if (item.owner.toString() === renterId) {
      return res.status(400).json({ success: false, msg: 'You cannot book your own item.' });
    }

    const overlap = await Booking.findOne({
      itemId,
      status: { $in: ["pending", "approved"] },
      startDate: { $lt: endDate },
      endDate: { $gt: startDate },
    });

    if (overlap) {
      return res.status(409).json({ success: false, msg: 'The selected dates overlap with an existing booking.' });
    }

    const newBooking = new Booking({
      userId: renterId,
      itemId,
      ownerId: item.owner,
      startDate,
      endDate,
      totalAmount,
      subtotal,
      shippingFee,
      securityDeposit: item.securityDeposit || 0,
      discount,
      deliveryMethod,
      couponCode,
    });

    await newBooking.save();

    // Notify owner
    await createNotification({
      recipientId: item.owner,
      senderId: renterId,
      type: 'new_booking',
      bookingId: newBooking._id,
      message: `You have a new booking request for your item: ${item.title}`,
    });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: newBooking,
    });
  } catch (err) {
    console.error('[CREATE BOOKING] Error:', err);
    res.status(500).json({ success: false, msg: 'Error creating booking', message: err.message });
  }
};

// ================================
// GET BOOKINGS FOR CURRENT USER (RENTER)
// ================================
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.userId })
      .populate('itemId', 'title images pricePerDay category')
      .populate('ownerId', 'name email profileImage')
      .sort({ createdAt: -1 });

    const validBookings = bookings
      .filter(b => b.itemId)
      .map(b => {
        const obj = b.toObject();
        return {
          ...bookingObject,
          rentalDuration: Math.max(1, dayjs(bookingObject.endDate).diff(dayjs(bookingObject.startDate), 'day')),
        };
      });

    res.json({ success: true, data: validBookings });
  } catch (err) {
    console.error('[GET MY BOOKINGS] Error:', err);
    res.status(500).json({ success: false, msg: 'Error fetching bookings', message: err.message });
  }
};

// ================================
// GET BOOKINGS FOR SPECIFIC USER (RENTER)
// ================================
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId })
      .populate('itemId', 'title images pricePerDay category')
      .populate('ownerId', 'name email profileImage')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: bookings });
  } catch (err) {
    console.error('[GET USER BOOKINGS] Error:', err);
    res.status(500).json({ success: false, msg: 'Error fetching bookings', message: err.message });
  }
};

// ================================
// GET BOOKINGS FOR ITEMS OWNED BY CURRENT USER
// ================================
exports.getBookingsForMyItems = async (req, res) => {
  try {
    const bookings = await Booking.find({ ownerId: req.user.userId })
      .populate('itemId', 'title images pricePerDay category') // Populating necessary item fields
      .populate('userId', 'name email phone address rating') // Populating necessary renter fields
      .sort({ createdAt: -1 });

    const validBookings = bookings
      .filter(b => b.itemId)
      .map(b => {
        const obj = b.toObject();
        return {
          ...bookingObject,
          rentalDuration: Math.max(1, dayjs(bookingObject.endDate).diff(dayjs(bookingObject.startDate), 'day')),
        };
      });

    res.json({ success: true, data: validBookings });
  } catch (err) {
    console.error('[GET OWNER BOOKINGS] Error:', err);
    res.status(500).json({ success: false, msg: 'Error fetching owner bookings', message: err.message });
  }
};

// ================================
// GET BOOKINGS FOR SPECIFIC OWNER
// ================================
exports.getOwnerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ ownerId: req.params.ownerId })
      .populate('itemId', 'title images pricePerDay')
      .populate('userId', 'name email phone address rating profileImage')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: bookings });
  } catch (err) {
    console.error('[GET OWNER BOOKINGS BY ID] Error:', err);
    res.status(500).json({ success: false, msg: 'Error fetching owner bookings', message: err.message });
  }
};

// ================================
// UPDATE BOOKING STATUS (OWNER)
// ================================
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id)
      .populate('itemId')
      .populate('userId', 'name email phone address rating');

    if (!booking) return res.status(404).json({ success: false, msg: 'Booking not found' });

    if (booking.ownerId.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, msg: 'Not authorized to update this booking' });
    }

    if (booking.status !== 'pending') {
      return res.status(400).json({ success: false, msg: `Cannot update a booking that is already '${booking.status}'` });
    }

    booking.status = status;
    await booking.save();

    if (['approved', 'cancelled'].includes(status)) {
      await createNotification({
        recipientId: booking.userId,
        senderId: booking.ownerId,
        type: `booking_${status}`,
        bookingId: booking._id,
        message: `Your booking for '${booking.itemId.title}' has been ${status}.`,
      });
    }

    res.json({ success: true, message: `Booking ${status}`, data: booking });
  } catch (err) {
    console.error('[UPDATE BOOKING STATUS] Error:', err);
    res.status(500).json({ success: false, msg: 'Error updating booking status', message: err.message });
  }
};

// ================================
// CANCEL BOOKING (RENTER)
// ================================
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ success: false, msg: 'Booking not found' });
    if (booking.userId.toString() !== req.user.userId) return res.status(403).json({ success: false, msg: 'Not authorized' });

    const today = new Date();
    const startDate = new Date(booking.startDate);
    const diffDays = Math.round((startDate.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));

    if (diffDays < 1) return res.status(400).json({ success: false, msg: 'Cancellations allowed only up to 1 day before start date.' });
    if (!['pending', 'approved'].includes(booking.status)) return res.status(400).json({ success: false, msg: `Cannot cancel booking with status '${booking.status}'` });

    booking.status = 'cancelled';
    await booking.save();

    await createNotification({
      recipientId: booking.ownerId,
      senderId: booking.userId,
      type: 'booking_cancelled',
      bookingId: booking._id,
      message: `A booking for your item has been cancelled.`
    });

    res.json({ success: true, message: 'Booking cancelled successfully', data: booking });
  } catch (err) {
    console.error('[CANCEL BOOKING] Error:', err);
    res.status(500).json({ success: false, msg: 'Error cancelling booking', message: err.message });
  }
};

// ================================
// GET BOOKING BY ID
// ================================
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('itemId', 'title images pricePerDay category description')
      .populate('userId', 'name email profileImage')
      .populate('ownerId', 'name email profileImage');

    if (!booking) return res.status(404).json({ success: false, msg: 'Booking not found' });

    if (booking.userId._id.toString() !== req.user.userId && booking.ownerId._id.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, msg: 'Not authorized to view this booking' });
    }

    res.json({ success: true, data: booking });
  } catch (err) {
    console.error('[GET BOOKING BY ID] Error:', err);
    res.status(500).json({ success: false, msg: 'Error fetching booking', message: err.message });
  }
};

// Get all bookings for a specific item
exports.getBookingsForItem = async (req, res) => {
  try {
    const bookings = await Booking.find({
      itemId: req.params.itemId,
      status: { $in: ['approved', 'pending'] },
    }).select('startDate endDate');
    res.json({ success: true, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Error fetching bookings for item', message: err.message });
  }
};
