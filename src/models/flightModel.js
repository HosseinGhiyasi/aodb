const { poolPromise } = require('../db/db');

const flightModel = {
    getAllFlights: async () => {
        console.log("Another hello from model");
        const pool = await poolPromise;
        try {
            const result = await pool.request().query('SELECT * FROM Flight');
            return result.recordset;
        } catch (error) {
            return 500;
        } finally {
            pool.release(); // Corrected typo: changed 'client.release()' to 'pool.release()'
        }
    }
};

module.exports = flightModel;
