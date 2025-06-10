const express = require('express');
const restaurantController = require('../controllers/restaurantController');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

router.get("/search", restaurantController.findRestaurantByName);
router.get("/", restaurantController.getAllRestaurants);
router.get("/:id", restaurantController.findRestaurantById);
router.get("/:id/add-favourites", authenticate, restaurantController.addToFavourite);


module.exports=router;