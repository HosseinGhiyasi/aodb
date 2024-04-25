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
                res.status(404).json({ "Error": "Flight not found with this id" });
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
            const flightData = {
                FlightNumber: req.body.FlightNumber,
                DepartureAirportCode: req.body.DepartureAirportCode,
                DestinationAirportCode: req.body.DestinationAirportCode,
                DepartureTime: req.body.DepartureTime,
                ArrivalTime: req.body.ArrivalTime,
                AircraftID: req.body.AircraftID,
                Status: req.body.Status
            };
            const result = await flightModel.addFlight(flightData);

            if (result.success) {
                res.status(200).json({ message: result.message });
            } else {
                res.status(400).json({ error: result.message });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    deleteFlight: async (req, res) => {
        try {
            const flightNumber = req.params.flightNumber;
            const result = await flightModel.deleteFlight(flightNumber);

            if (result.success) {
                res.status(200).json({ message: result.message });
            } else {
                res.status(400).json({ error: result.message });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error'});
        }
    },
    updateFlight: async (req, res) => {
        try {
            const flightNumber = req.params.flightNumber;
            const updatedFlightData = req.body; 

            const result = await flightModel.updateFlight(flightNumber, updatedFlightData);

            if (result.success) {
                res.status(200).json({ message: result.message });
            } else {
                res.status(400).json({ error: result.message });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getFlightsByRoute: async (req, res) => {
        try {
            const departureCity = req.query.departureCity; 
            const destinationCity = req.query.destinationCity; 
            if (!departureCity || !destinationCity) {
                return res.status(400).json({ error: 'Departure city and destination city are required' });
            }

            const result = await flightModel.getFlightsByRoute(departureCity, destinationCity);

            if (result.success) {
                res.status(200).json(result.data);
            } else {
                res.status(400).json({ error: result.message });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    searchFlight: async (req, res) => {
        try {
            const departureCity = req.query.departureCity; 
            const destinationCity = req.query.destinationCity; 
            const departureTime = req.query.departureTime;
            // const arrivalTime = req.query.arrivalTime;
            if (!departureCity || !destinationCity || !departureTime) {
                return res.status(400).json({ error: 'Neccessary data should be filled' });
            }

            const result = await flightModel.searchFlight(departureCity, destinationCity,departureTime);

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

module.exports = flightController;
