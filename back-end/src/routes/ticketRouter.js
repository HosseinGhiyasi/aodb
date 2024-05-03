const express = require('express');
const ticketController = require('../controllers/ticketController');

const router = express.Router();

router.get('/tickets', ticketController.getAllTickets);

module.exports = router;
