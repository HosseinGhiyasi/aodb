const flightModel = require('../models/flightModel');

const flightController = {
    // addOrder: async (req, res) => {
    //     try {
    //         const productId = req.params.productId;
    //         const username = getUsernameFromCookie(req.headers.cookie);
    //         console.log(productId, username);
    //         if (!username) {
    //             throw new Error('Username not found in the cookie.');
    //         }

    //         await orderModel.addOrder(productId, username);

    //         res.status(200).json({ message: "Order added successfully" });
    //     } catch (error) {
    //         res.status(400).json({ error: error.message });
    //     }
    // },
    // getOrdersByUsername: async (req, res) => {
    //     try {
    //         const username = req.params.username;
    //         const orders = await orderModel.getOrdersByUsername(username);
    //         res.status(200).json(orders);
    //     } catch (error) {
    //         res.status(500).json({ error: error.message });
    //     }
    // },
    // getOrderById: async (req, res) => {
    //     try {
    //         const orderId = req.params.order_id;
    //         const order = await orderModel.getOrderById(orderId);

    //         if (order) {
    //             res.status(200).json(order);
    //         } else {
    //             res.status(404).json({ error: 'Order not found' });
    //         }
    //     } catch (error) {
    //         res.status(400).json({ error: error.message });
    //     }
    // },
    // getAllOrders: async (req, res) => {
    //     try {
    //         const orders = await orderModel.getAllOrders();
    //         res.status(200).json(orders);
    //     } catch (error) {
    //         res.status(500).json({ error: error.message });
    //     }
    // },
    // deleteOrder: async (req, res) => {
    //     try {
    //         const orderId = req.params.orderId;
    //         console.log(orderId);
    //         await orderModel.deleteOrder(orderId);
            
    //         res.status(200).json({ message: "Order deleted successfully" });
    //     } catch (error) {
    //         res.status(400).json({ error: error.message });
    //     }
    // },
    // updateOrder: async (req, res) => {
    //     try {
    //         const orderId = req.params.orderId;
    //         const productId = req.body.productId;
    //         console.log(orderId);
    //         // Call the model function to delete order
    //         await orderModel.updateOrder(orderId,productId);
            
    //         res.status(200).json({ message: "Order updated successfully" });
    //     } catch (error) {
    //         res.status(400).json({ error: error.message });
    //     }
    // }
    getAllFlights: async(req,res) => {
        console.log("hello");
        try {
            const result = await flightModel.getAllFlights();
            if (result == 500){
                res.status(500).json({"Error":"Internal Server Error"});
            }
            else{
                res.status(200).json(result);
            }
            
        } catch (error) {
            res.status(400).json({error:error.message});
        }
    }
};

module.exports = flightController;