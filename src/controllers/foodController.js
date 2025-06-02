const { searchFood, updateAvailabilityStatus } = require('../service/food.service');
const foodService = require('../service/foodService');
const restaurantService = require('../service/restaurantService');
const userService = require('../service/userService');

module.exports = {

searchFood: async (req, res) => {
    try {
        const { name } = req.query;
        const menuItem = await foodService.searchFood(name);
        res.status(200).json(menuItem);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
},

getMenuItemByRestaurantId: async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const { vegetarian, nonveg, seasonal, food_Category } = req.query;
        const menuItems = await foodService.getRestaurantsFood(restaurantId, vegetarian, nonveg, seasonal, food_Category);
        res.status(200).json(menuItems);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
},

//Admin controller

async createItem(req, res) {
    try {
        const item = req.body;
        const user = req.user;
        const restaurant = await restaurantService.findRestaurantById(item.restaurantId);
        const menuItem = await foodService.createFood(item, restaurant);
        res.status(201).json(menuItem);
    } catch (error) {
        if (error instanceof Error){
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
},

async deleteItem(req, res){
    try {
        const {id} = req.params;
        const user = req.user;
        await foodService.deleteFood(id);
        res.status(200).json({ message: "Menu item deleted successfully" });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
},

async updateAvailabilityStatus(req, res) {
    try {
        const {id} = req.params;
        const menuItem = await foodService.updateAvailabilityStatus(id);
        res.status(200).json(menuItem);
    } catch (error) {
        if( error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
},
};