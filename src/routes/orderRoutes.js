const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authenticate = require('../middleware/authenticate');


router.post('',authenticate, orderController.createOrder);
router.get('/user', authenticate, orderController.getAllUserOrders);

module.exports = router;