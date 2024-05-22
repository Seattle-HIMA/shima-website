import express from 'express'
import models from '../../models.js';
import {
    checkIfAdminPermissions, validateAccessToken
} from "../middleware/auth0.middleware.js";
import { AdminMessagesPermissions } from "./messages/messages-permissions.js";


const router = express.Router();

// add a new user information to the database
router.post('/add', async (req, res) => {
    try {
        const {email, firstName, lastName} = req.body;

        if(email && firstName && lastName) {
            const existingUser = await models.User.findOne({email});

            if (!existingUser) {
                const newUser = new models.User({email, firstName, lastName});
                await newUser.save();
                res.type('text').send('New user added successfully');
            } else {
                res.status(400).json({message: 'This user already exists.'});
            }
        } else {
            res.status(400).json({message: 'Missing required body parameters.'});
        }
    } catch (error) {
        console.error('Error adding new user:', error);
        res.status(500).json({message: err.message});
    }
});

// get a user membership's type
router.post('/get-membership-type', async (req, res) => {
    try {
        const { email } = req.body;

        if (email) {
            const user = await models.User.findOne({email});

            if(user) {
                res.json({ 'membership': user.membershipType});
            } else {
                res.status(400).json({ message: 'No user exists with the given email.'});
            }
        } else {
            res.status(400).json({message: 'Missing required body parameter: email'});
        }
    } catch(error) {
        console.error('Error adding new user:', error);
        res.status(500).json({message: err.message});
    }
});

// check a user's admin status
router.get('/admin-status', validateAccessToken, checkIfAdminPermissions([AdminMessagesPermissions.Read]), (req, res) => {
    try {
        const isAdmin = req.isAdmin;
        res.json({isAdmin});
    } catch (error) {
        console.error('Error retrieving admin status:', error);
        res.status(500).json({message: err.message});
    }
})

// get back all users who have an account on the page
router.get('/allMembers', async (req, res) => {
    try {
        const users = await models.User.find();
        res.data = users
        res.json(users);
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({message: err.message});
    }
});

// get back the information of the currently logged in user
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
        res.status(500).json({message: err.message});
    }
})

export default router;