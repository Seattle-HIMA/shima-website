import express from 'express'
import models from '../../models.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await models.User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/add', async (req, res) => {
    try {
        const {email, firstName, lastName} = req.body;

        const existingUser = await models.User.findOne({email});

        if (!existingUser) {
            const newUser = new models.User({email, firstName, lastName});
            await newUser.save();
            res.status(200).send('New user added successfully');
            console.log("new user added");
        }
    } catch (error) {
        console.error('Error adding new user:', error);
        res.status(500).send(error.message);
    }
})

export default router;