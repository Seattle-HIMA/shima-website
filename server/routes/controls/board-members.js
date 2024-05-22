import express from 'express'
import models from '../../models.js';

const router = express.Router();

// get information from database
router.get('/', async (req, res) => {
    try{
        let data = await models.BoardMembers.find({});

        if (data) {
            res.json(data);
        } else {
            res.status(401).json({message: 'No board members information existed.'});
        }
    } catch(err) {
        console.error('Error getting board members:', err);
        res.status(500).json({message: err.message});
    }
});

export default router
