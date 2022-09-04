class Module {
    constructor(app) {
       this.app = app;
    }
   init() {
    const usercontroller = require('./user/user.controller');
    new usercontroller(this.app);
   }
  }
  module.exports = Module;