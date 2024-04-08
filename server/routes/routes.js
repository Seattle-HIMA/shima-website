const express = require('express');
const router = express.Router();

const homepageRouter = require('./controls/homepage.js');


router.use('/homepage', homepageRouter);

module.exports = router;