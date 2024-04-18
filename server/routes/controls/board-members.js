import express from 'express'
import models from '../../models.js';

const router = express.Router();

// get information from database
router.get('/', async (req, res) => {
    let data = await models.BoardMembers.find({});

    if (data) {
        res.json(data);
    } else {
        res.status(401).json({message: "No board members information existed."});
    }
});

// add new board members
router.post('/add', async (req, res) => {
    try {
        let {username, password, img, about, degree, currJob, first, last} = req.body;
        let newMember = new models.BoardMembers({
            username,
            password,
            first,
            last,
            img,
            about,
            degree,
            currJob
        })
        await newMember.save();
        res.type('text').send({status: 'success', message: 'Added a new board member successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// update member's info
router.post('/update', async (req, res) => {
    try {
        let {name, updatedInfo} = req.body;
        let member = await models.BoardMembers.findOneAndUpdate({username: name}, updatedInfo, {new: true});
        res.json(member);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// delete a member
router.post('/delete', async (req, res) => {
    try {
        let {name} = req.body;
        await models.BoardMembers.findOneAndDelete({username: name});
        res.type('text').send("A board member has been successfully deleted");
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

export default router
