const router = require('express').Router();

const orderController = require('../controllers/order');

// GET /api/v1/order
router.get('/', function(req, res) {
    orderController.getAllOrders(req, res);
});

// GET /api/v1/order/:id Par ID de la commande
router.get('/:id', function(req, res) {
    orderController.getOrder(req, res);
});

// GET /api/v1/order/client/:id Par ID du client
router.get('/client/:id', function(req, res) {
    orderController.getOrderByClient(req, res);
});

// GET /api/v1/order/delivery/:id
router.get('/delivery/:id', function(req, res) {
    orderController.getOrderByDelivery(req, res);
});

// GET /api/v1/order/restaurant/:id
router.get('/restaurant/:id', function(req, res) {
    orderController.getOrderByRestaurant(req, res);
});

// POST /api/v1/order
router.post('/', function(req, res) {
    orderController.createOrder(req, res);
});

// PUT /api/v1/order/:id
router.put('/:id', function(req, res) {
    orderController.updateOrder(req, res);
});

module.exports = router;