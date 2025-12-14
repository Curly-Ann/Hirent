// Report routes for user submissions
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const reportController = require('../controllers/reportController');

// Submit a report
router.post('/', auth, reportController.submitReport);

// Get my reports
router.get('/my-reports', auth, reportController.getMyReports);

module.exports = router;
