import express from 'express'
import { getJSONFile, updateJSONFile } from '../utils/fileUtils.js'

const router = express.Router();


// get information from homepage json files
router.get('/', async (req, res) => {
    try {
        let data = await getJSONFile('./assets/homepage.json')
        res.json(data);
    } catch (err) {
        if (err.code === "ENOENT") {
            res.type('text').status(500).send("file does not exist");
        } else {
            res.type('text').status(500).send({message: err.message});
        }
    }
});

<<<<<<< HEAD
router.post('/update', async (req, res) => {
  try{
    // get body params from frontend
    // format:
    //    section: the name of the modified section
    //    newInfo = { partToChange: 'new value' }
    let { section, newInfo } = req.body;
    if (section && newInfo) {
      updateData = {}
      if (section === 'homepage') {
        updateData.section = section;
        updateData.part = newInfo.partToChange;
        updateData.updatedInfo = newInfo.value;
      } else if (data.subsections.section) {
        let subsection = data.subsections;
        updateData.subsection.section = section;
        updateData.subsection.part = newInfo.partToChange;
        updateData.subsection.updatedInfo = newInfo.value;
      } else {
        res.type('text').status(400).send(`There's no ${section} section on this page`);
      }
    } else {
      res.status(400).type('text').send("Updated section or updated information is missing.");
=======
// update homepage information
router.post('/update', async (req, res) => {
    res.type('text');
    try {
        // get body params
        let {section, info} = req.body;
        if (section && info) {
            let result = ""
            let data = await getJSONFile('./assets/homepage.json');
            // update json file according to given information
            if (section === "homepage") {
                result = await updateJSONFile('./assets/homepage.json', {
                    "title": info.updatedPart,
                    "value": info.updatedInfo
                })
            } else if (data[section]) {
                result = await updateJSONFile('./assets/homepage.json', {
                    "title": section[info.updatedPart],
                    "value": info.updatedInfo
                })
            } else {
                res.type('text').status(400).send(`There's no ${section} section on this page`);
            }

            res.send(result);
        } else {
            res.status(400).send("Updated section or updated information is missing.");
        }
    } catch (err) {
        if (err.code === "ENOENT") {
            res.status(500).send("file does not exist");
        } else {
            res.status(500).send({message: err.message});
        }
>>>>>>> main
    }
});

export default router