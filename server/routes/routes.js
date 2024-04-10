const express = require('express');
const router = express.Router();

const homepageRouter = require('./controls/homepage.js');
const boardMembersRouter = require('./controls/board-members.js');


router.use('/homepage', homepageRouter);
router.use('/members', boardMembersRouter);

module.exports = router;