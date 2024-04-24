const express = require('express');
const flightController = require('../controllers/flightController');

const router = express.Router();

router.get('/flights', flightController.getAllFlights);
router.get('/flights/:flightNumber', flightController.getFlightByFlightNumber);
router.post('/flights', flightController.addFlight); 

module.exports = router;
