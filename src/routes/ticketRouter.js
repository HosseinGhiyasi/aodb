const express = require('express');
const ticketController = require('../controllers/ticketController');

const router = express.Router();

// Define the route for getting all tickets sold
router.get('/tickets', ticketController.getAllTickets);

module.exports = router;
