const Food = require("../models/food.model");
module.exports = {
    async createFood(req, restaurant){
        try {
            const food = new Food({
                foodCategory: req.Category,
                crationDate: new Date(),
                description: req.description,
                images: req.images,
                name: req.name,
                price: req.price,
                isSeasonal: req.isSeasonal,
                isVegetarian: req.isVegetarian,
                restaurant: restaurant._id,
                ingredients: req.ingredients,
            });
            await food.save();
            restaurant.foods.push(food._id);
            await restaurant.save();
            return food;
        } catch (error) {
            throw new Error(`Failed to create food: ${error.message}`);
        }
    },

    async deleteFood(foodId){
        try {
            const food = await Food.findById(foodId);
            if (!food) {
                throw new Error(`Food not found with ID: ${foodId}`);
            }
            food.restaurant= null; // Remove association with restaurant
            await food.save();
            await Food.findByIdAndDelete(foodId);
        } catch (error) {
            throw new Error(`Failed to delete food with Id ${foodId}: ${error.message}`);
        }
    },

    async getRestaurantsFood(restaurantId, vegetarian, nonveg, seasonal, foodCategory){
       try {
        let query = { restaurant: restaurantId };
        console.log(nonveg)
        if (vegetarian == "true"){
            query.isVegetarian = true;
        }
        if (nonveg == "true") query.isVegetarian = false;
        if (seasonal == "true") query.isSeasonal = true;
        if (foodCategory) query.foodCategory = foodCategory;
        
        const foods = await Food.find(query).populate([
            {path: "ingredients", populate: {path: "category", select: "name"}},
            "foodCategory",
            {path: "restaurant", select: "name _id"},
        ]);
        return foods;

       } catch (error) {
            throw new Error(`Failed to retrieve restaurant's food: ${error.message}`);
       } 
    },

    async searchFood(keyword){
        try {
            let query = {};
        if (keyword){
            query.$or = [
                { name: { $regex: keyword, $options: 'i' } },
                { "foodCategory.name": { $regex: keyword, $options: 'i' } },
            ];
        }
        const foods = await Food.find(query);
        return foods;
        } catch (error) {
            throw new Error(`Failed to search food: ${error.message}`);
        }
    },

    async updateAvailabilityStatus(foodId){
        try {
            const food = await Food.findById(foodId).populate([
                {path: "ingredients", populate: {path: "category", select: "name"}},
                "foodCategory",
                {path: "restaurant", select: "name _id"},
            ]);
            if(!food){
                throw new Error(`Food not found with ID: ${foodId}`);
            }
            food.available = !food.available;
            await food.save();
            return food;
        } catch (error) {
            throw new Error(`Failed to update availability status for food with ID ${foodId}: ${error.message}`);
        }
    },

    async findFoodById(foodId){
        try {
            const food = await Food.findById(foodId);
            if (!food) {
                throw new Error(`Food not found with ID: ${foodId}`);
            }
            return food;
        } catch (error) {
            throw new Error(`Failed to find food with ID ${foodId}: ${error.message}`);
        }
    },
};