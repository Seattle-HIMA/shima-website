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

router.post('/update', async (req, res) => {
  try{
    // get body params from frontend
    // format:
    //    section: the name of the modified section
    //    newInfo = { partToChange: 'new value' }
    let { section, newInfo } = req.body;
    if (section && newInfo) {
      updateData = {}
      updateData.section = section;
      updateData.part = newInfo.partToChange;
      updateData.updatedInfo = newInfo.value;
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