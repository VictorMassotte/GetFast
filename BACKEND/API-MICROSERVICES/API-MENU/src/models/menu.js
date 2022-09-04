const mongoose = require('../database/index'), Schema = mongoose.Schema;

const menu_schema = new Schema({
    id: Schema.Types.ObjectId, 
    restaurantId: Schema.Types.ObjectId, 
    name: String,
    description: String,
    category: String,
    content: Array,
    price: Number,   
    versionKey: false
});

const menu = mongoose.model("menu", menu_schema);

module.exports = menu;