const router = require('express').Router();

const menuController = require('../controllers/menu');

// GET /api/v1/menu
router.get('/',function(req,res){
    menuController.getmenu(req,res);
});

//  GET /api/v1/menu/:id
router.get('/:id',function(req,res){
    menuController.getmenuById(req,res);
});

router.get('/restaurant/:id',function(req,res){
    menuController.getByRestaurantId(req,res);
});

// POST /api/v1/menu
router.post('/',function(req,res){
    menuController.createmenu(req,res);
});

// PUT /api/v1/menu/:id
router.put('/:id',function(req,res){
    menuController.updatemenu(req,res);
});

// DELETE /api/v1/menu/:id
router.delete('/:id',function(req,res){
    menuController.deletemenu(req,res);
});

module.exports = router;