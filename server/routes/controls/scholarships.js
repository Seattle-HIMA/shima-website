import { getJSONFile, updateJSONFile } from '../utils/fileUtils.js'
import express from 'express'
import { promises as fs } from 'fs';

const router = express.Router();


// get information from scholarships json files
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

router.post('/update', async (req, res) => {
    try {
        // get body params from frontend
        // format:
        //    section: the name of the modified section
        //    newInfo = { partToChange: 'new value' }
        let {section, newInfo} = req.body;
        if (section && newInfo) {
            let updateData = {}
            updateData.section = section;
            updateData.part = newInfo.partToChange;
            updateData.updatedInfo = newInfo.value;
            let updated = await updateJSONFile('scholarships', updateData);
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

router.post("/add/winner", async (req, res) => {
    try {
        // get body params
        let {name, scholarships, year, images, description} = req.body;
        if (name && scholarships && year && images && description) {
            let winners = await getJSONFile('./assets/scholarships.json');
            winners.name = {
                "year": year,
                "photo": images,
                "description": description
            }

            await fs.writeFile('./assets/scholarships.json', JSON.stringify(winners));
            res.json(winners);
        } else {
            res.status(400).send("Updated section or updated information is missing.");
        }
    } catch (err) {
        if (err.code === "ENOENT") {
            res.status(500).send("file does not exist");
        } else {
            res.status(500).send({message: err.message});
        }
    }
})

export default router
