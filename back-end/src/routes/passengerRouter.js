const express = require('express');
const passengerController = require('../controllers/passengerController');

const router = express.Router();

router.get('/passenger/:flightNumber', passengerController.getPassengerByFlightNumber);

module.exports = router;
