// Report controller for user submissions
const Report = require("../models/Report");

// Submit a report
exports.submitReport = async (req, res) => {
  try {
    console.log("[REPORT] Submitting report");
    const { reportType, reportedUserId, reportedItemId, reportedBookingId, reason, description } = req.body;
    const reporterId = req.user.userId;

    // Validate input
    if (!reportType || !reason) {
      return res.status(400).json({
        success: false,
        message: "Report type and reason are required",
      });
    }

    if (!['user', 'item', 'booking'].includes(reportType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid report type",
      });
    }

    // Create report
    const report = new Report({
      reporterId,
      reportedUserId: reportType === 'user' ? reportedUserId : undefined,
      reportedItemId: reportType === 'item' ? reportedItemId : undefined,
      reportedBookingId: reportType === 'booking' ? reportedBookingId : undefined,
      reportType,
      reason,
      description,
      status: 'pending',
    });

    await report.save();
    console.log("[REPORT] Report submitted successfully:", report._id);

    res.status(201).json({
      success: true,
      data: report,
      message: "Report submitted successfully",
    });
  } catch (err) {
    console.error("[REPORT] Error submitting report:", err.message);
    res.status(500).json({
      success: false,
      message: "Error submitting report: " + err.message,
    });
  }
};

// Get reports submitted by current user
exports.getMyReports = async (req, res) => {
  try {
    console.log("[REPORT] Fetching user's reports");
    const reporterId = req.user.userId;

    const reports = await Report.find({ reporterId })
      .populate('reportedUserId', 'name email')
      .populate('reportedItemId', 'title')
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      data: reports,
      count: reports.length,
    });
  } catch (err) {
    console.error("[REPORT] Error fetching reports:", err.message);
    res.status(500).json({
      success: false,
      message: "Error fetching reports: " + err.message,
    });
  }
};
