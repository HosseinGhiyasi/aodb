const { poolPromise,sql } = require('../db/db');


const passengerModel = {
    getPassengerByFlightNumber: async (flightNumber) => {
        const pool = await poolPromise;
        try {
            const request = pool.request();
            request.input('FlightNumber', sql.NVarChar(10), flightNumber);
            const result = await request.query('select * from getPassengersByFlight_fn(@FlightNumber)');
            if (result.recordset.length === 0) {
                return { success: false, message: 'No passengers found!' };
            }
            else{
                return { success: true, data: result.recordset };
            }

            
        } catch (error) {
            console.error(error);
            return { success: false, message: error.message };
        } finally {
            pool.release();
        }
    }
};

module.exports = passengerModel;
