const Events = require('../models/event.model');
const { events, findById } = require('../models/ingredientCategory.model');
const Restaurant = require('../models/restaurant.model');

module.exports = {
    async createEvent(event, restaurantId) {
        try {
            const restaurant = await Restaurant.findById(restaurantId);
            if (!restaurant) {
                throw new Error(`Restaurant with ID ${restaurantId} not found`);
            }

            const createdEvent = new Events({
                restaurant: restaurantId,
                image: event.image,
                startedAt: event.startedAt,
                endsAt: event.endsAt,
                name: event.name,
                location: event.location
            });
            await createdEvent.save();
            return createdEvent;

        } catch (error) {
            throw new Error(`Error creating event: ${error.message}`);
        }
    },

    async findAllEvent(){
        try {
            const events = await Events.find();
            return events;
        } catch (error) {
            throw new Error(`Failed to find all events: ${error.message}`);
        }
    },

    async findRestaurantsEvent(restaurantId){
        try {
            const events = await Events.find({ restaurant: restaurantId });
            return events;
        } catch (error) {
            throw new Error(`Failed to find events for restaurant with ID ${restaurantId}: ${error.message}`);
        }
    },

    async deleteEvent(eventId){
        try {
            await Events.findByIdAndDelete(eventId);
            return { message: "Event deleted successfully" };
        } catch (error) {
            throw new Error(`Failed to delete event with ID ${eventId}: ${error.message}`);
        }
    },

    async findById(eventId) {
        try {
            const event = await Events.findById(eventId);
            if (!event) {
                throw new Error(`Event with ID ${eventId} not found`);
            }
            return event;
        } catch (error) {
            throw new Error(`Failed to find event with ID ${eventId}: ${error.message}`);
        }
    },
};