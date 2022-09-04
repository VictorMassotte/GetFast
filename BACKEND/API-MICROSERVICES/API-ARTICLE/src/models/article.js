const mongoose = require('../database/index'), Schema = mongoose.Schema;

const article_schema = new Schema({
    id: Schema.Types.ObjectId,
    restaurantId: Schema.Types.ObjectId, 
    name: String,
    image: String,   
    description: String,
    price: Number,
    type: String,
    versionKey: false,
});

const article = mongoose.model("article", article_schema);

module.exports = article;