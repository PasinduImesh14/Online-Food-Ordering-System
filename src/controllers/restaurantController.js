const Restaurant = require("../models/restaurant.model");
const restaurantService = require("../service/restaurantService");

module.exports = {

    createRestaurant: async (req, res) => {
        try {
            const user = req.user;
            const restaurant = await restaurantService.createRestaurant(
                req.body,
                user);
        } catch (error) {
            res.status(400).send({error:error.message});
        }
    },
deleteRestaurantById: async (req, res) => {
    try {
        const {id} = req.params;
        const user = req.user;
        await restaurantService.deleteRestaurant(id);
        res.status(200).json({message:"Restaurant deleted successfully", success:true});
    } catch (error) {
        if(error instanceof Error){
            res.status(400).json({message:error.message});
        } else {
            res.status(500).json({message:"Internal server error"});
        }
    }
},

updateRestaurantStatus: async (req, res) => {
    try {
        const {id} = req.params;
        console.log("restaurant id", id);
        const restaurant = await restaurantService.updateRestaurantStatus(id.toString());
        console.log("restaurant id", id);
        res.status(200).json(restaurant);
    } catch (error) {
        if(rror instanceof Error){
            res.status(400).json({error: "Internal server error"});
        }
    }
},

findRestaurantByUserId: async(req, res) => {
    try {
        const user = req.user;
        const restaurant = await restaurantService.getRestaurantsByUserId(user._id);
    } catch (error) {
        if(error instanceof Error){
            res.status(400).json({error:error.message});
        } else {
            res.status(500).json({error:"Internal server error"});
        }
    }
},

findRestaurantByName: async (req,res) => {
    try {
        const {keyword} = req.query;
        const restaurants= await restaurantService.searchRestaurant(keyword);
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({error:"Internal server error"});
    }
},

getAllRestaurants: async (req, res) => {
    try {
        const restaurants = await restaurantService.getAllRestaurants();
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({error: "Internal server error"});
    }
},

findRestaurantById: async (req,res) => {
    try {
        const {id} = req.params;
        const restaurant = await restaurantService.findRestaurantById(id);
        res.status(200).json({error: error.message});
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({error: error.message});
        } else {
            res.status(500).json({error: "Internal server error"});
        }
    }
},

addToFavourite: async (req, res) => {
    try {
        const {jwt} = req.headers;
        const{id} = req.params;
    } catch (error) {
        
    }
}

};