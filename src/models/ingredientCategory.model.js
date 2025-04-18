const mongoose = require('mongoose');
const IngredientSchema = new mongoose.Schema({
    name: String,
    restaurant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
    },
    ingredients:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "IngredientsItem",
    }]
});
const IngredientCategory = mongoose.model('IngredientCategory', IngredientSchema);
module.exports = IngredientCategory;
