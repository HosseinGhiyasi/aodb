const { poolPromise,sql } = require('../db/db');


const ticketModel = {
    getAllTickets: async () => {
        const pool = await poolPromise;
        try {
            const result = await pool.request().query('SELECT * FROM Ticket');

            if (result.recordset.length === 0) {
                return { success: false, message: 'No tickets found!' };
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

module.exports = ticketModel;
