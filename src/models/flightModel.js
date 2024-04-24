const { poolPromise,sql } = require('../db/db');

const flightModel = {
    getAllFlights: async () => {
        const pool = await poolPromise;
        try {
            const result = await pool.request().query('SELECT * FROM Flight');
            return result.recordset;
        } catch (error) {
            return 500;
        } finally {
            pool.release();
        }
    },

    getFlightByFlightNumber: async (flightNumber) => {
        const pool = await poolPromise;
        try {
            const result = await pool
                .request()
                .input('FlightNumber', sql.NVarChar, flightNumber) //avoding sql injections
                .query('SELECT * FROM Flight WHERE FlightNumber = @FlightNumber');

            if (result.recordset.length > 0) {
                return result.recordset[0];
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            return 500; 
        } finally {
            pool.release();
        }
    },
    addFlight: async (flightData) => {
        const pool = await poolPromise;
        try {
            const request = pool.request();

            request.input('FlightNumber', sql.NVarChar(10), flightData.FlightNumber);
            request.input('DepartureAirportCode', sql.VarChar(3), flightData.DepartureAirportCode);
            request.input('DestinationAirportCode', sql.VarChar(3), flightData.DestinationAirportCode);
            request.input('DepartureTime', sql.DateTime, flightData.DepartureTime);
            request.input('ArrivalTime', sql.DateTime, flightData.ArrivalTime);
            request.input('AircraftID', sql.VarChar(10), flightData.AircraftID);
            console.log(flightData.AircraftID);
            request.input('Status', sql.NVarChar(20), flightData.Status);

            const result = await request.execute('InsertFlight');
            
            if (result.returnValue === 0) {
                return { success: true, message: 'Flight added successfully' };
            } else {
                return { success: false, message: result.output.Error_Message };
            }
        } catch (error) {
            console.error(error);
            return { success: false, message: 'Internal Server Error' };
        } finally {
            pool.release();
        }
    }
};

module.exports = flightModel;
