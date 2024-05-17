import express from 'express'
import models from '../../models.js';
import { getJSONFile, updateJSONFile } from '../utils/fileUtils.js'

const router = express.Router();


// get information from workshops json files
router.get('/', async (req, res) => {
    try {
        let data = await getJSONFile('./assets/workshops.json')
        res.json(data);
    } catch (err) {
        if (err.code === "ENOENT") {
            res.type('text').status(500).send("File does not exist. Please double check the file name");
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
      res.status(500).send('Internal Server Error');
  }
});

// get all paid workshop for the given user
router.post('/get-paid-workshops', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await models.User.findOne({email});
        res.json({ "workshops": user.registeredPastRecordings});
    } catch(error) {
        console.error('Error adding new user:', error);
        res.status(500).send('Internal Server Error');
    }
});

// check if the user has paid for the given recording
router.post('/workshop-isPaid/:id', async (req, res) => {
    try {
        let vid = req.params.id;
        const { email } = req.body;
        const user = await models.User.findOne({email});
        let paid = user.registeredPastRecordings;

        if (paid.includes(vid)) {
            res.json({isPaid: true});
        } else {
            res.json({isPaid: false});
        }
    } catch {
        console.error('Error checking paid recordings:', error);
        res.status(500).send('Internal Server Error');
    }
})

// add new workshop to the db
router.post('/add', async (req, res) => {
  try {
      const {name, date, description, speaker, flyer} = req.body;
      const newWorkshops = new models.Workshops(
        {name, date, description, speaker, flyer});
      await newWorkshops.save();
      res.status(200).send('New user added successfully');
  } catch (error) {
      console.error('Error adding new user:', error);
      res.status(500).send('Internal Server Error');
  }
});

export default router