const restaurant = require('../models/restaurant');

const send = require('../utils/send');

let restaurantController = {

    async get (req, res) {
        try {
            let resto = await restaurant.find();
            send.sendData(res, resto);
        }catch (error) {
            send.sendError(res, 500, error);
        }
    },

    async getById (req, res) {
        try {
            let resto = await restaurant.findById(req.params.id);
            send.sendData(res, resto);
        }catch (error) {
            send.sendError(res, 500, error);
        }
    },

    async getByOwner (req, res) {
        try {
            let resto = await restaurant.find({owner: req.params.id});
            send.sendData(res, resto);
        }catch (error) {
            send.sendError(res, 500, error);
        }
    },
    
    async create (req, res) {
        try {
            let resto = await restaurant.create(req.body);
            send.sendData(res, resto);
        }catch (error) {
            send.sendError(res, 500, error);
        }
    },

    async update (req, res) {
        try {
            let resto = await restaurant.findByIdAndUpdate(req.params.id, req.body);
            send.sendData(res, resto);
        }catch (error) {
            send.sendError(res, 500, error);
        }
    },

    async delete (req, res) {
        try {
            let resto = await restaurant.findByIdAndDelete(req.params.id);
            send.sendData(res, resto);
        }catch (error) {
            send.sendError(res, 500, error);
        }
    }
}

module.exports = restaurantController
