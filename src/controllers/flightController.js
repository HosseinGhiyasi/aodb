const flightModel = require('../models/flightModel');

const flightController = {
    getAllFlights: async (req, res) => {
        try {
            const result = await flightModel.getAllFlights();
            if (result === 500) {
                res.status(500).json({ "Error": "Internal Server Error" });
            } else {
                res.status(200).json(result);
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getFlightByFlightNumber: async (req, res) => {
        try {
            const flightNumber = req.params.flightNumber; 
            const flight = await flightModel.getFlightByFlightNumber(flightNumber);
            
            if (flight === null) {
                res.status(404).json({ "Error": "Flight not found" });
            } else if (flight === 500) {
                res.status(500).json({ "Error": "Internal Server Error" });
            } else {
                res.status(200).json(flight);
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    addFlight: async (req, res) => {
        try {
            console.log(req);
            const flightData = {
                FlightNumber: req.body.FlightNumber,
                DepartureAirportCode: req.body.DepartureAirportCode,
                DestinationAirportCode: req.body.DestinationAirportCode,
                DepartureTime: req.body.DepartureTime,
                ArrivalTime: req.body.ArrivalTime,
                AircraftID: req.body.AircraftID,
                Status: req.body.Status
            };
            console.log(flightData);
            const result = await flightModel.addFlight(flightData);

            if (result.success) {
                res.status(200).json({ message: result.message });
            } else {
                res.status(400).json({ error: result.message });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

module.exports = flightController;
