import express from 'express'
import { getJSONFile } from '../utils/fileUtils.js'

const router = express.Router();

// get information from homepage.json files
router.get('/', async (req, res) => {
    try {
        let data = await getJSONFile('./assets/homepage.json')
        res.json(data);
    } catch (err) {
        if (err.code === "ENOENT") {
            res.type('text').status(500).send("File does not exist. Please double check the file name");
        } else {
            res.status(500).json({message: err.message});
        }
    }
});

export default router