import express from 'express';
import homepageRouter from './controls/homepage.js';
import scholarshipsRouter from './controls/scholarships.js';
import membershipRouter from './controls/memberships.js';
import workshopsRouter from './controls/workshops.js';
import boardMembersRouter from './controls/board-members.js';
import messagesRouter from './controls/messages/messages.router.js'
import userRouter from './controls/users.js';
import paymentRouter from './controls/payment.js';

const router = express.Router();


router.use('/homepage', homepageRouter);
router.use('/scholarships', scholarshipsRouter);
router.use('/membership', membershipRouter);
router.use('/workshops', workshopsRouter);
router.use('/members', boardMembersRouter);
router.use('/messages', messagesRouter);
router.use('/users', userRouter);
router.use('/payment', paymentRouter);

export default router;