const { searchFood } = require('../service/foodService');
const foodService = require('../services/foodService');
const restaurantService = require('../services/restaurantService');
const userService = require('../services/userService');

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

}