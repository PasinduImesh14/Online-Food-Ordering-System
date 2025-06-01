const Address = require("../models/address.model");
const Restaurant = require("../models/restaurant.model");
const Order = require("../models/order.model");
const OrderItem = require("../models/orderItem.model");
const cartService = require("./cart.service");
const paymentService = require("./payment.service");

module.exports = {
    async createOrder(order, user){
        try {
            const address = order.deliveryAddress;
            let savedAddress;
            if (address._id){
                const isAddressExist = await Address.findById(address._id);
                if (isAddressxist){
                    savedAddress = isAddressExist;
                } else {
                    const shippingAddress = new Address(order.deliveryAddress);
                    savedAddress = await shippingAddress.save();
                }
            }

            if (!user.addresses.includes(savedAddress._id)){
                user.addresses.push(savedAddress._id);
                await user.save();
            }

            const restaurant = await Restaurant.findById(order.restaurantId);
            if (!restaurant) {
                throw new Error(`Restaurant not found with ID: ${order.restaurantId}`);
            }

            const cart = await cartService.findCartByUserId(user._id);
            if (!cart) {
                throw new Error("Cart not found for the user");
            }
            const orderItems = [];

            for(const cartItem of cart.items){
                const orderItem = new OrderItem({
                    food: cartItem.food,
                    ingredients: cartItem.ingredients,
                    quantity: cartItem.quantity,
                    totalPrice: cartItem.food.price * cartItem.quantity,
                });
                
                const savedOrderItem = await orderItem.save();
                orderItems.push(savedOrderItem._id);
            }

            const totalPrice = await cartService.calculateCartTotals(cart);
            const createdOrder = new Order({
                customer: user._id,
                deliveryAddress: savedAddress._id,
                createdAt: new Date(),
                orderStatus: "PENDING",
                totalAmount: totalPrice,
                restaurant: restaurant._id,
                items: orderItems,
            });

            const savedOrder = await createdOrder.save();

            restaurant.orders.push(savedOrder._id);
            await restaurant.save();

            /*const paymentResponse = await paymentService.generatePaymentLink(savedOrder);
            console.log(paymentResponse);
            return paymentResponse;*/
            return savedOrder;
        } catch (error) {
            throw new Error(`Error creating order: ${error.message}`);
        }
    },

    async cancelOrder(orderId){
        try {
            await Order.findByIdAndDelete(orderId);
        } catch (error) {
            throw new Error(`Error cancelling order Id ${orderId}: ${error.message}`);
        }
    },

    async findOrderById(orderId){
        try {
            const order = await Order.findById(orderId);
            if (!order) {
                throw new Error(`Order not found with ID: ${orderId}`);
            }
            return order;
        } catch (error) {
            throw new Error(`Error finding order by ID ${orderId}: ${error.message}`);
        }
    },

    async getUserOrders(userId) {
        try {
            const orders = await Order.find({ customer: userId });
            return orders;
        } catch (error) {
            throw new Error(`Error fetching orders: ${error.message}`);
        }
    },

    async getOrdersOfRestaurant(restaurantId, orderStatus) {
        try {
            let orders = await Order.find({restaurant: restaurantId});
            if (orderStatus) {
                orders = orders.filter(order => order.orderStatus === orderStatus);
            }
            return orders;
        } catch (error) {
            throw new Error(`Failed to get orders of restaurant with Id ${restaurantId}: ${error.message}`);
        }
    },

    async updateOrder(orderId, orderStatus) {
        try {
            const validStatuses = [
                "OUT_FOR_DELIVERY",
                "DELIVERED",
                "COMPLETED",
                "PENDING",
            ];
            if (!validStatuses.includes(orderStatus)) {
                throw new Error("Please provide a valid order status");
            }

            const order = await Order.findById(orderId);
            if (!order) {
                throw new Error(`Order not found with ID: ${orderId}`);
            }

            order.orderStatus = orderStatus;
            await order.save();

            //Send notification 
            // await notificationService.sendOrderStatusNotification(order);
            return order;
        } catch (error) {
            throw new Error(`Error updating order status for order ID ${orderId}: ${error.message}`);
        }
    },

};
