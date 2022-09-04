require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var orderRouter = require('./routes/order');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(`${process.env.API_URL}`, orderRouter);

app.listen(process.env.PORT, () => console.log('Server app listening on port ' + process.env.PORT));

module.exports = app;
