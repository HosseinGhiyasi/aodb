const passengerModel = require('../models/passengerModel');

const passengerController = {
    getPassengerByFlightNumber: async (req, res) => {
        try {
            const flightNumber = req.params.flightNumber; 
            const result = await passengerModel.getPassengerByFlightNumber(flightNumber);
            if (result.success) {
                res.status(200).json(result.data);
            } else {
                res.status(400).json({ error: result.message });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

module.exports = passengerController;
