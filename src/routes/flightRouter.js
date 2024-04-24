const express = require('express');
const flightController = require('../controllers/flightController');

const router = express.Router();

router.get('/flights', flightController.getAllFlights);
// router.get('/getOrders/:username', orderController.getOrdersByUsername);
// router.get('/getAllOrders', orderController.getAllOrders);
// router.post('/deleteOrder/:orderId', orderController.deleteOrder);
// router.post('/updateOrder/:orderId',orderController.updateOrder);

module.exports = router;