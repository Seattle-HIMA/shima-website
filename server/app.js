var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
require('dotenv').config();

var apiRouter = require('./routes/api');
var models = require('./models.js');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// mongodb middleware
app.use((req, res, next) => {
  req.models = models;
  next();
});

app.use('/api', apiRouter);

module.exports = app;