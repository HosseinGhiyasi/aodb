// ticketController.js
const ticketModel = require('../models/ticketModel');

const ticketController = {
    getAllTickets: async (req, res) => {
        try {
            const result = await ticketModel.getAllTickets();
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

module.exports = ticketController;
