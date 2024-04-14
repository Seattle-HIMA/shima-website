import express from 'express';
const router = express.Router();

import homepageRouter from './controls/homepage.js';
import boardMembersRouter from './controls/board-members.js';


router.use('/homepage', homepageRouter);
router.use('/members', boardMembersRouter);

export default router