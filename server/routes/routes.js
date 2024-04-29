import express from 'express';

const router = express.Router();

import homepageRouter from './controls/homepage.js';
import scholarshipsRouter from './controls/scholarships.js';
import membershipRouter from './controls/memberships.js'
import boardMembersRouter from './controls/board-members.js';
import messagesRouter from './controls/messages/messages.router.js'

router.use('/homepage', homepageRouter);
router.use('/scholarships', scholarshipsRouter);
router.use('/membership', membershipRouter);
router.use('/members', boardMembersRouter);
router.use('/messages', messagesRouter);

export default router