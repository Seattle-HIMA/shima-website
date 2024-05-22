import { getJSONFile } from '../utils/fileUtils.js'
import express from 'express'

const router = express.Router();

// get information from membership.json files
router.get('/', async (req, res) => {
    try {
        let data = await getJSONFile('./assets/memberships.json')
        res.json(data);
    } catch (err) {
        if (err.code === "ENOENT") {
            res.type('text').status(500).send("File does not exist. Please double check the file name");
        } else {
            res.type('text').status(500).send({message: err.message});
        }
    }
});

export default router