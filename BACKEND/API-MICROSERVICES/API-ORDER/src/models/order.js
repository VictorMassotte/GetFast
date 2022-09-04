const mongoose = require('../database/index'), Schema = mongoose.Schema;

const order_schema = new Schema({
    id: Schema.Types.ObjectId,
    user: Number,
    delivery: Number,
    address: String,
    created: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'pending'
    },
    accepted: {
        type: Boolean,
        default: null
    },
    restaurant: String,
    price: Number,
    menus: Array,
    article: Array,
    versionKey: false,
});

const order = mongoose.model("order", order_schema);

module.exports = order;