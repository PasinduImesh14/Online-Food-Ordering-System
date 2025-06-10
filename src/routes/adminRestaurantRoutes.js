const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const adminRestaurantController = require('../controllers/adminRestaurantController');

router.post('/', authenticate, adminRestaurantController.createRestaurant);
router.delete('/:id', authenticate, adminRestaurantController.deleteRestaurantById);
router.put('/:id/status', authenticate, adminRestaurantController.updateRestaurantStatus);
router.get('/user', authenticate, adminRestaurantController.findRestaurantByUserId);

module.exports = router;