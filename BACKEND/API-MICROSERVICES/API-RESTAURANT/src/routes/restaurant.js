const router = require('express').Router();

const restaurantController = require('../controllers/restaurant');

// GET /api/v1/restaurant
router.get('/', function(req, res) {
    restaurantController.get(req, res);
});

// GET /api/v1/restaurant/:id
router.get('/:id', function(req, res) {
    restaurantController.getById(req, res);
});

// GET /api/v1/restaurant/owner/:id
router.get('/owner/:id', function(req, res) {
    restaurantController.getByOwner(req, res);
});

// POST /api/v1/restaurant
router.post('/', function(req, res) {
    restaurantController.create(req, res);
});

// PUT /api/v1/restaurant/:id
router.put('/:id', function(req, res) {
    restaurantController.update(req, res);
});

// DELETE /api/v1/restaurant/:id
router.delete('/:id', function(req, res) {
    restaurantController.delete(req, res);
});

module.exports = router;