import express from 'express'
import models from '../../models.js';
import { getJSONFile } from '../utils/fileUtils.js'

const router = express.Router();


// get information from workshops.json files
router.get('/', async (req, res) => {
    try {
        let data = await getJSONFile('./assets/workshops.json')
        res.json(data);
    } catch (err) {
        if (err.code === 'ENOENT') {
            res.type('text').status(500).send('File does not exist. Please double check the file name');
        } else {
            res.status(500).json({message: err.message});
        }
    }
});

// get all workshops info from mongodb
router.get('/get-all-workshops', async (req, res) => {
  try {
      const workshops = await models.Workshops.find();
      res.json(workshops);
  } catch(error) {
      console.error('Error adding new user:', error);
      res.status(500).json({message: err.message});
  }
});

// get all paid workshop for the given user
router.post('/get-paid-workshops', async (req, res) => {
    try {
        // user's email sent back from the user
        const { email } = req.body;

        if(email) {
            const user = await models.User.findOne({email});
            res.json({ 'workshops': user.registeredPastRecordings});
        } else {
            res.status(400).json({message: 'Missing required body parameter: email'});
        }
    } catch(error) {
        console.error('Error adding new user:', error);
        res.status(500).json({message: err.message});
    }
});

// get workshop by ID
router.get('/get-workshop/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const workshop = await models.Workshops.findById(id);
        if (!workshop) {
            return res.status(404).send({message: 'Workshop not found'});
        }
        res.json(workshop);
    } catch (error) {
        console.error('Error retrieving workshop:', error);
        res.status(500).json({message: err.message});
    }
})

// check if the user has paid for the given recording
router.post('/workshop-isPaid/:id', async (req, res) => {
    try {
        let vid = req.params.id;
        const { email } = req.body;

        if(email) {
            const user = await models.User.findOne({email});
            let paid = user.registeredPastRecordings;

            if (paid.includes(vid)) {
                res.json({isPaid: true});
            } else {
                res.json({isPaid: false});
            }
        } else {
            res.status(400).json({message: 'Missing required body parameter: email'});
        }
    } catch {
        console.error('Error checking paid recordings:', error);
        res.status(500).json({message: err.message});
    }
})

export default router