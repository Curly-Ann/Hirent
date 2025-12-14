const Booking = require('../models/Booking');
const Item = require('../models/Item');
const { createNotification } = require('./notificationController');
const dayjs = require('dayjs');

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const {
      itemId, startDate, endDate, totalAmount, subtotal,
      shippingFee, discount, deliveryMethod, couponCode, paymentMethod,
    } = req.body;

    const renterId = req.user.userId;

    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ success: false, msg: 'Item not found' });

    if (item.owner.toString() === renterId)
      return res.status(400).json({ success: false, msg: 'You cannot book your own item.' });

    const overlap = await Booking.findOne({
      itemId,
      status: { $in: ["pending", "approved"] },
      startDate: { $lt: endDate },
      endDate: { $gt: startDate },
    });

    if (overlap) return res.status(409).json({ success: false, msg: 'Selected dates overlap with an existing booking.' });

    const newBooking = new Booking({
      userId: renterId,       
      itemId: item._id,
      ownerId: item.owner,
      startDate,
      endDate,
      totalAmount,
      subtotal,
      shippingFee,
      securityDeposit: item.securityDeposit || 0,
      discount,
      deliveryMethod,         
      paymentMethod,          
    });

    await newBooking.save();

    // Create notification for the owner
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


// Get bookings made by the current user (renter)
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.userId })
      .populate('itemId', 'title images pricePerDay category')
      .populate('ownerId', 'name email profileImage')
      .sort({ createdAt: -1 });

    // Filter out bookings where the item has been deleted and add rental duration
    const validBookings = bookings
      .filter(booking => booking.itemId)
      .map(booking => {
        const bookingObject = booking.toObject();
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

// Get bookings for a specific user (by userId)
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId })
      .populate('itemId', 'title images pricePerDay category zone location province')
      .populate('ownerId', 'name email profileImage')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Error fetching bookings', message: err.message });
  }
};

// Get bookings for items owned by the current user (with optional itemId filter)
// IMPORTANT: Only returns active bookings (pending, approved, ongoing) for calendar display
exports.getBookingsForMyItems = async (req, res) => {
  try {
    const { itemId } = req.query;
    
    // Build query - always filter by owner AND exclude cancelled/rejected bookings
    const query = { 
      ownerId: req.user.userId,
      // Only include bookings that should block dates on the calendar
      status: { $in: ['pending', 'approved', 'ongoing'] }
    };
    
    // Add itemId filter if provided
    if (itemId) {
      query.itemId = itemId;
    }
    
    const bookings = await Booking.find(query)
      .populate('itemId', 'title images pricePerDay category') // Populating necessary item fields
      .populate('userId', 'name email phone address rating') // Populating necessary renter fields
      .sort({ startDate: 1 }); // Sort by start date for schedule

    const validBookings = bookings
      .filter(booking => booking.itemId)
      .map(booking => {
        const bookingObject = booking.toObject();
        return {
          ...bookingObject,
          rentalDuration: Math.max(1, dayjs(bookingObject.endDate).diff(dayjs(bookingObject.startDate), 'day')),
        };
      });

    // Add safe HTTP cache headers for schedule data (private, short TTL)
    res.set("Cache-Control", "private, max-age=30, stale-while-revalidate=60");
    res.json({ success: true, data: validBookings });
  } catch (err) {
    console.error('[GET OWNER BOOKINGS] Error:', err);
    res.status(500).json({ success: false, msg: 'Error fetching owner bookings', message: err.message });
  }
};

// Get bookings for a specific owner (by ownerId)
exports.getOwnerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ ownerId: req.params.ownerId })
      .populate('itemId', 'title images pricePerDay')
      .populate('userId', 'name email phone address rating profileImage')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Error fetching owner bookings', message: err.message });
  }
};

// Update booking status (by owner)
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id)
      .populate('itemId')
      .populate('userId', 'name email phone address rating');

    if (!booking) {
      return res.status(404).json({ success: false, msg: 'Booking not found' });
    }

    if (booking.ownerId.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, msg: 'You are not authorized to update this booking' });
    }

    if (booking.status !== 'pending') {
      return res.status(400).json({ success: false, msg: `Cannot update status of a booking that is already '${booking.status}'` });
    }

    booking.status = status;
    await booking.save();

    // Create notification for the renter on approval or cancellation
    if (status === 'approved' || status === 'cancelled') {
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

// Cancel a booking (by renter)
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, msg: 'Booking not found' });
    }

    if (booking.userId.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, msg: 'You are not authorized to cancel this booking' });
    }

    // Cancellation logic: today < startDate - 1 day
    const today = new Date();
    const startDate = new Date(booking.startDate);
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round((startDate.getTime() - today.getTime()) / oneDay);

    if (diffDays < 1) {
        return res.status(400).json({ success: false, msg: 'Cancellation is only allowed up to one day before the start date.' });
    }

    if (booking.status !== 'pending' && booking.status !== 'approved') {
        return res.status(400).json({ success: false, msg: `You can only cancel pending or approved bookings. Current status: ${booking.status}` });
    }

    booking.status = 'cancelled';
    await booking.save();

    // Notify owner of the cancellation
    await createNotification({
      recipientId: booking.ownerId,
      senderId: booking.userId,
      type: 'booking_cancelled',
      bookingId: booking._id,
      message: `A booking for your item has been cancelled.`
    });

    res.json({ success: true, message: 'Booking cancelled successfully', data: booking });
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Error cancelling booking', message: err.message });
  }
};

// Get a single booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('itemId', 'title images pricePerDay category description')
      .populate('userId', 'name email profileImage')
      .populate('ownerId', 'name email profileImage');

    if (!booking) {
      return res.status(404).json({ success: false, msg: 'Booking not found' });
    }

    // Check if user is either the renter or the owner
    if (booking.userId._id.toString() !== req.user.userId && booking.ownerId._id.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, msg: 'You are not authorized to view this booking' });
    }

    res.json({ success: true, data: booking });
  } catch (err) {
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