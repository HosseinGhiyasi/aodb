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
    }
};

module.exports = flightModel;
