const Restaurant = require("../models/restaurant.model");

module.exports = {

    createRestaurant: async (req, res) => {
        try {
            const user = req.user;
            const restaurant = await Restaurant.createRestaurant(
                req.body,
                user);
        } catch (error) {
            res.status(400).send({error:error.message});
        }
    },
deleteRestaurantById: async (req, res) => {
    try {
        const {id} = req.params;
        const user = await userService.findUserProfileByJwt(jwt);
        await RestaurantService.deleteRestaurant(id);
        res.status(400).json({message:"Restaurant deleted successfully", success:true});
    } catch (error) {
        if(error instanceof Error){
            res.status(400).json({message:error.message});
        } else {

        }
    }
}
};