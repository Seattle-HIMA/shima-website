import express from 'express';
import { getAdminMessage, getProtectedMessage, getPublicMessage } from './messages.service.js';
import { validateAccessToken } from '../../middleware/auth0.middleware.js';

const messagesRouter = express.Router();

messagesRouter.get('/public', (req, res) => {
    const message = getPublicMessage();

    res.status(200).json(message);
});

messagesRouter.get('/protected', validateAccessToken, (req, res) => {
    const message = getProtectedMessage();

    res.status(200).json(message);
});

messagesRouter.get('/admin', validateAccessToken, (req, res) => {
    const message = getAdminMessage();

    res.status(200).json(message);
});

export default messagesRouter;
