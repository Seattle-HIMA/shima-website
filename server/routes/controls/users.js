import express from 'express'
import models from '../../models.js';
import {
    checkIfAdminPermissions, validateAccessToken
} from "../middleware/auth0.middleware.js";
import { AdminMessagesPermissions } from "./messages/messages-permissions.js";


const router = express.Router();

router.post('/add', async (req, res) => {
    try {
        const {email, firstName, lastName} = req.body;

        const existingUser = await models.User.findOne({email});

        if (!existingUser) {
            const newUser = new models.User({email, firstName, lastName});
            await newUser.save();
            res.status(200).send('New user added successfully');
        }
    } catch (error) {
        console.error('Error adding new user:', error);
        res.status(500).send('Internal Server Error');
    }
})

router.get('/adminStatus', validateAccessToken, checkIfAdminPermissions([AdminMessagesPermissions.Read]), (req, res) => {
    try {
        const isAdmin = req.isAdmin;
        res.json({isAdmin});
    } catch (error) {
        console.error('Error retrieving admin status:', error);
        res.status(500).send('Internal Server Error');
    }
})

router.get('/allMembers', async (req, res) => {
    try {
        const users = await models.User.find();
        res.data = users
        res.status(200).json(users);
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/currentUser', validateAccessToken, async (req, res) => {
    try {
        const currUserEmail = req.headers.email;
        const user = await models.User.findOne({email: currUserEmail});

        if (user) {
            res.data = user;
            res.status(200).json(user);
        } else {
            res.status(401).json({message: "No user found"});
        }
    } catch (error) {
        console.error('Error retrieving current user:', error);
        res.status(500).send('Internal Server Error');
    }
})

export default router;