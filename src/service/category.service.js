const Category = require('../model/category.model');
const Restaurant = require('../model/restaurant.model');

module.exports = {
    async createCategory(name, userId){
        try {
            const restaurant = await Restaurant.findOne({ owner: userId });
            if (!restaurant) {
                throw new Error(`Restaurant not found for the user with ID: ${userId}`);
            }

            const createdCategory = new Category({name, restaurant: restaurant._id});
            await createdCategory.save();
            return createdCategory;

        } catch (error) {
            throw new Error(`Failed to crate category: ${error.message}`);
        }
    },

async findCategoryByRestaurantId(restaurantId) {
    try {
        const categories = await Category.find({ restaurant: restaurantId });
    return categories;
    } catch (error) {
        throw new Error(`Failed to find categories for restaurant with ID ${restaurantId}: ${error.message}`);
    }
},

async findCategoryById(categoryId) {
    try {
        const category = await Category.findById(categoryId);
        if (!category) {
            throw new Error(`Category not found with ID: ${categoryId}`);
        }
        return category;

    } catch (error) {
        throw new Error(`Failed to find category with ID ${categoryId}: ${error.message}`);
    }
},

};