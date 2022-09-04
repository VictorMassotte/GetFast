const article = require('../models/article');

const send = require('../utils/send');

let articleController = {

    async get (req, res) {
        try {
            let restoArticle = await article.find();
            send.sendData(res, restoArticle);
        }catch (error) {
            send.sendError(res, 500, error);
        }
    },

    async getById (req, res) {
        try {
            let restoArticle = await article.findById(req.params.id);
            send.sendData(res, restoArticle);
        }catch (error) {
            send.sendError(res, 500, error);
        }
    },

    async getByRestaurantId (req, res) {
        try {
            let restoArticle = await article.find({restaurantId: req.params.id});
            send.sendData(res, restoArticle);
        }catch (error) {
            send.sendError(res, 500, error);
        }
    },

    async create (req, res) {
        try {
            let restoArticle = await article.create(req.body);
            send.sendData(res, restoArticle);
        }catch (error) {
            send.sendError(res, 500, error);
        }
    },

    async update (req, res) {
        try {
            let restoArticle = await article.findByIdAndUpdate(req.params.id, req.body);
            send.sendData(res, restoArticle);
        }catch (error) {
            send.sendError(res, 500, error);
        }
    },

    async delete (req, res) {
        try {
            let restoArticle = await article.findByIdAndDelete(req.params.id);
            send.sendData(res, restoArticle);
        }catch (error) {
            send.sendError(res, 500, error);
        }
    }
}

module.exports = articleController
