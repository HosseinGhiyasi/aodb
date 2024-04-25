const express = require('express');
const flightController = require('../controllers/flightController');

const router = express.Router();

router.get('/flights', flightController.getAllFlights);
router.get('/flights/search/',flightController.searchFlight); // searching by city and date
router.get('/flights/search/cities', flightController.getFlightsByRoute); // searching only by city
router.get('/flights/:flightNumber', flightController.getFlightByFlightNumber);
router.post('/flights', flightController.addFlight); 
router.delete('/flights/:flightNumber', flightController.deleteFlight);
router.put('/flights/:flightNumber', flightController.updateFlight);


module.exports = router;    
