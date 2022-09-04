const mongoose = require('../database/index'), Schema = mongoose.Schema;

const restaurant_schema = new Schema({
    id: Schema.Types.ObjectId, 
    owner: Number,
    name: String,
    address: String,
    status: String,
    image: String,
    opening: String,
    closing: String,
    tags: Array,
    description: String,
    menus: Array,
    article: Array,
    versionKey: false,
});

const restaurant = mongoose.model("restaurant", restaurant_schema);

module.exports = restaurant;