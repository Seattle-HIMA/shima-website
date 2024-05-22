import { getJSONFile } from '../utils/fileUtils.js'
import express from 'express'
import { promises as fs } from 'fs';

const router = express.Router();


// get information from scholarships.json files
router.get('/', async (req, res) => {
    try {
        let data = await getJSONFile('./assets/scholarships.json')
        res.json(data);
    } catch (err) {
        if (err.code === "ENOENT") {
            res.type('text').status(500).send("file does not exist");
        } else {
            res.type('text').status(500).send({message: err.message});
        }
    }
});

export default router
