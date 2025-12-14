// Admin controller for dashboard operations
const User = require("../models/Users");
const Item = require("../models/Item");
const Booking = require("../models/Booking");
const Report = require("../models/Report");

// Get all users (renters and owners)
exports.getAllUsers = async (req, res) => {
  try {
    console.log("[ADMIN] Fetching all users");
    
    const users = await User.find({ role: { $in: ['renter', 'owner'] } })
      .select('_id name email role status createdAt')
      .lean();

    res.json({
      success: true,
      data: users,
      count: users.length,
    });
  } catch (err) {
    console.error("[ADMIN] Error fetching users:", err.message);
    res.status(500).json({
      success: false,
      msg: "Error fetching users",
      error: err.message,
    });
  }
};

// Get all items
exports.getAllItems = async (req, res) => {
  try {
    console.log("[ADMIN] Fetching all items");
    
    const items = await Item.find({})
      .populate('owner', 'name email')
      .select('_id title owner status createdAt views totalBookings')
      .lean();

    res.json({
      success: true,
      data: items,
      count: items.length,
    });
  } catch (err) {
    console.error("[ADMIN] Error fetching items:", err.message);
    res.status(500).json({
      success: false,
      msg: "Error fetching items",
      error: err.message,
    });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    console.log("[ADMIN] Fetching all bookings");
    
    const bookings = await Booking.find({})
      .populate('userId', 'name email')
      .populate('ownerId', 'name email')
      .populate('itemId', 'title')
      .select('_id userId ownerId itemId startDate endDate status totalAmount createdAt')
      .lean();

    res.json({
      success: true,
      data: bookings,
      count: bookings.length,
    });
  } catch (err) {
    console.error("[ADMIN] Error fetching bookings:", err.message);
    res.status(500).json({
      success: false,
      msg: "Error fetching bookings",
      error: err.message,
    });
  }
};

// Get all reports
exports.getAllReports = async (req, res) => {
  try {
    console.log("[ADMIN] Fetching all reports");
    
    const reports = await Report.find({})
      .populate('reporterId', 'name email')
      .populate('reportedUserId', 'name email')
      .populate('reportedItemId', 'title')
      .populate('reportedBookingId', '_id')
      .select('_id reporterId reportedUserId reportedItemId reportedBookingId reportType reason status createdAt')
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      data: reports,
      count: reports.length,
    });
  } catch (err) {
    console.error("[ADMIN] Error fetching reports:", err.message);
    res.status(500).json({
      success: false,
      msg: "Error fetching reports",
      error: err.message,
    });
  }
};

// Suspend/disable user
exports.suspendUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    console.log("[ADMIN] Suspending user:", userId, "status:", status);

    const user = await User.findByIdAndUpdate(
      userId,
      { status },
      { new: true }
    ).select('_id name email role status');

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    res.json({
      success: true,
      data: user,
      message: `User ${status === 'suspended' ? 'suspended' : 'activated'} successfully`,
    });
  } catch (err) {
    console.error("[ADMIN] Error suspending user:", err.message);
    res.status(500).json({
      success: false,
      msg: "Error updating user status",
      error: err.message,
    });
  }
};

// Remove item
exports.removeItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    console.log("[ADMIN] Removing item:", itemId);

    const item = await Item.findByIdAndUpdate(
      itemId,
      { status: 'removed' },
      { new: true }
    ).select('_id title status');

    if (!item) {
      return res.status(404).json({
        success: false,
        msg: "Item not found",
      });
    }

    res.json({
      success: true,
      data: item,
      message: "Item removed successfully",
    });
  } catch (err) {
    console.error("[ADMIN] Error removing item:", err.message);
    res.status(500).json({
      success: false,
      msg: "Error removing item",
      error: err.message,
    });
  }
};

// Update report status
exports.updateReportStatus = async (req, res) => {
  try {
    const { reportId } = req.params;
    const { status, adminNotes } = req.body;

    console.log("[ADMIN] Updating report:", reportId, "status:", status);

    const report = await Report.findByIdAndUpdate(
      reportId,
      { status, adminNotes },
      { new: true }
    ).populate('reporterId', 'name email')
     .populate('reportedUserId', 'name email');

    if (!report) {
      return res.status(404).json({
        success: false,
        msg: "Report not found",
      });
    }

    res.json({
      success: true,
      data: report,
      message: "Report updated successfully",
    });
  } catch (err) {
    console.error("[ADMIN] Error updating report:", err.message);
    res.status(500).json({
      success: false,
      msg: "Error updating report",
      error: err.message,
    });
  }
};

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    console.log("[ADMIN] Fetching dashboard statistics");

    const totalUsers = await User.countDocuments({ role: { $in: ['renter', 'owner'] } });
    const totalItems = await Item.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const pendingReports = await Report.countDocuments({ status: 'pending' });
    const totalRevenue = await Booking.aggregate([
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalItems,
        totalBookings,
        pendingReports,
        totalRevenue: totalRevenue[0]?.total || 0,
      },
    });
  } catch (err) {
    console.error("[ADMIN] Error fetching dashboard stats:", err.message);
    res.status(500).json({
      success: false,
      msg: "Error fetching statistics",
      error: err.message,
    });
  }
};
