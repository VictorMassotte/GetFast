const router = require('express').Router();

const articleController = require('../controllers/article');

// GET /api/v1/article
router.get('/', function(req, res) {
    articleController.get(req, res);
});

// GET /api/v1/article/:id
router.get('/:id', function(req, res) {
    articleController.getById(req, res);
});

// GET /api/v1/article/restaurant/:id
router.get("/restaurant/:id", function(req, res) {
    articleController.getByRestaurantId(req, res);
});

// POST /api/v1/article
router.post('/', function(req, res) {
    articleController.create(req, res);
});

// PUT /api/v1/article/:id
router.put('/:id', function(req, res) {
    articleController.update(req, res);
});

// DELETE /api/v1/article/:id
router.delete('/:id', function(req, res) {
    articleController.delete(req, res);
});

module.exports = router;