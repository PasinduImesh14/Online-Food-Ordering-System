const orderService = require("../services/order.service.js");
const userService = require("../services/user.service.js");

module.exports = {
    createOrder: async (req, res) => {
        try {
            const order = req.body;
            const user = req.user;
            const paymentResponse = await orderService.createOrder(order, user);
            res.status(200).json(paymentResponse);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    },

    getAllUserOrders: async (req, res) => {
        try {
            user = req.user;
            const userOrders = await orderService.getAllUserOrders(user._id);
            res.status(200).json(userOrders);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    },

};