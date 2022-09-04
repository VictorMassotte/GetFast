const menu = require('../models/menu');

const send = require('../utils/send');

let menuController = {

    async getmenu(req, res) {
        try {
            let restomenu = await menu.find();
            send.sendData(res, restomenu);
        }catch (err) {
            send.sendData(res, 500, err);
        }
    },

    async getmenuById(req, res) {
        try {
            let restomenu = await menu.findById(req.params.id);
            send.sendData(res, restomenu);
        }catch (err) {
            send.sendData(res, 500, err);
        }
    },

    async getByRestaurantId(req, res) {
        try {
            let restomenu = await menu.find({restaurantId: req.params.id});
            send.sendData(res, restomenu);
        }catch (err) {
            send.sendData(res, 500, err);
        }
    },

    async createmenu(req, res) {
        try {
            let restomenu = await menu.create(req.body);
            send.sendData(res, restomenu);
        }catch (err) {
            send.sendData(res, 500, err);
        }
    },

    async updatemenu(req, res) {
        try {
            let restomenu = await menu.findByIdAndUpdate(req.params.id, req.body);
            send.sendData(res, restomenu);
        }catch (err) {
            send.sendData(res, 500, err);
        }
    },

    async deletemenu(req, res) {
        try {
            let restomenu = await menu.findByIdAndDelete(req.params.id);
            send.sendData(res, restomenu);
        }catch (err) {
            send.sendData(res, 500, err);
        }
    }

}

module.exports = menuController;
