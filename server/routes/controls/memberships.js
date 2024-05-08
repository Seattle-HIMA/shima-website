import { getJSONFile, updateJSONFile } from '../utils/fileUtils.js'
import express from 'express'
import models from '../../models.js'

const router = express.Router();


// get information from homepage json files
router.get('/', async (req, res) => {
    try {
        let data = await getJSONFile('./assets/memberships.json')
        console.log(data)
        res.json(data);
    } catch (err) {
        if (err.code === "ENOENT") {
            res.type('text').status(500).send("File does not exist. Please double check the file name");
        } else {
            res.type('text').status(500).send({message: err.message});
        }
    }
});

// update homepage information
router.post('/update', async (req, res) => {
    try{
        // get body params from frontend
        // format:
        //    section: the name of the modified section
        //    newInfo = { partToChange: 'new value' }
        let { section, newInfo } = req.body;
        if (section && newInfo) {
        let updateData = {}
        updateData.section = section;
        updateData.part = newInfo.partToChange;
        updateData.updatedInfo = newInfo.value;
        let updated = await updateJSONFile('membership', updateData);
        res.json(updated);
        }
    } catch (err) {
        if (err.code === "ENOENT") {
            res.status(500).send("file does not exist");
        } else {
            res.status(500).send({message: err.message});
        }
    }
});

export default router