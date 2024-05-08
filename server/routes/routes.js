import express from 'express';

const router = express.Router();

import homepageRouter from './controls/homepage.js';
import scholarshipsRouter from './controls/scholarships.js';
import membershipRouter from './controls/memberships.js'
import boardMembersRouter from './controls/board-members.js';
import messagesRouter from './controls/messages/messages.router.js'
import userRouter from './controls/user.js';
import paymentRouter from './controls/payment.js';


router.use('/homepage', homepageRouter);
router.use('/scholarships', scholarshipsRouter);
router.use('/membership', membershipRouter);
router.use('/members', boardMembersRouter);
router.use('/messages', messagesRouter);
router.use('/users', userRouter);
router.use('/payment', paymentRouter);

export default router;