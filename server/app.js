const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const apiRouter = require('./routes/routes.js');
const models = require('./database/models.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// mongodb middleware
app.use((req, res, next) => {
  req.models = models;
  next();
});

app.use('/routes', apiRouter);

module.exports = app;