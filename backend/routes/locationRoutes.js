const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

router.post('/', locationController.addLocation);
router.get('/nearby', locationController.getNearbyLocations);

module.exports = router;