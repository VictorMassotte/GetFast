const order = require('../models/order');

const mongoose = require('../database/index'), Schema = mongoose.Schema;

const send = require('../utils/send');

let orderController = {

    async getAllOrders(req, res) {
        try {
            let ord = await order.find().sort({ created: -1 });
            send.sendData(res, ord);
        } catch (error) {
            send.sendError(res, error);
        }
    },

    async getOrder(req, res) {
        try {

            let ord = await order.findById(req.params.id).sort({ created: -1 });
            send.sendData(res, ord);
        } catch (error) {
            send.sendError(res, error);
        }
    },

    async createOrder(req, res) {
        try {
            let ord = await order.create(req.body);
            send.sendData(res, ord);
        } catch (error) {
            send.sendError(res, error);
        }
    },

    async updateOrder(req, res) {
        try {
            let ord = await order.findByIdAndUpdate(req.params.id, req.body);
            send.sendData(res, ord);
        } catch (error) {
            send.sendError(res, error);
        }
    },

    async getOrderByClient(req, res) {
        try {
            let ord = await order.find({user: req.params.id }).sort({ created: -1 });
            send.sendData(res, ord);
        } catch (error) {
            send.sendError(res, error);
        }
    },

    async getOrderByDelivery(req, res) {
        try {
            let ord = await order.find({delivery: req.params.id }).sort({ created: -1 });
            send.sendData(res, ord);
        } catch (error) {
            send.sendError(res, error);
        }
    },

    async getOrderByRestaurant(req, res) {
        try {
            let ord = await order.find({ restaurant: req.params.id }).sort({ created: -1 });
            send.sendData(res, ord);
        } catch (error) {
            send.sendError(res, error);
        }
    }

}

module.exports = orderController
