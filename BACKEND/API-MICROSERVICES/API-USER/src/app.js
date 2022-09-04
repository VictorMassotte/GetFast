require('dotenv').config();

const express = require('express');
const bodyparser = require('body-parser');
var app = express();

const appRouting = require('./modules');

const appModules = new appRouting(app); // create new instance of appRouting 

app.use(bodyparser.json({ limit: '50mb' }));
app.use(bodyparser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

appModules.init();

app.listen(process.env.PORT, () => console.log('Server app listening on port ' + process.env.PORT));

module.exports = app; // export app for testing purposes