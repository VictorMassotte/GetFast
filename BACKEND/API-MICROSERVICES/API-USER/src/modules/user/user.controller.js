const user = require('../../routes/router');
const express = require('express');
const router = express.Router();
class UserController {
    constructor(app) {
      router.get('/', user.getAllUsers);
      router.get('/:id', user.getUsers);
      router.get('/email/:email', user.getUserByEmail);
      router.post('/', user.addUser);
      router.put('/:id', user.updateUsers);
      router.delete('/:id', user.deleteUser);
      
      app.use('/api/v1/users', router);
    }
 }
module.exports = UserController;