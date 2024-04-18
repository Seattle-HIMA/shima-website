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
  } catch(err){
    if (err.code === "ENOENT") {
      res.type('text').status(500).send("file does not exist");
    } else {
      res.type('text').status(500).send({ message: err.message });
    }
  }
});

// update homepage information
router.post('/update', async(req, res) => {
  res.type('text');
  try{
    // get body params
    let {section, info} = req.body;
    if(section && info){
      let result = ""
      let data = await getJSONFile('./assets/memberships.json');
      // update json file according to given information
      if(section === "memberships") {
        result = await updateJSONFile('./assets/memberships.json', {"title": info.updatedPart, "value": info.updatedInfo})
      } else if (data[section]) {
        result = await updateJSONFile('./assets/memberships.json', {"title": section[info.updatedPart], "value": info.updatedInfo})
      } else {
        res.type('text').status(400).send(`There's no ${section} section on this page`);
      }

      res.send(result);
    }else {
      res.status(400).send("Updated section or updated information is missing.");
    }
  }catch(err){
    if (err.code === "ENOENT") {
      res.status(500).send("file does not exist");
    } else {
      res.status(500).send({ message: err.message });
    }
  }
});

export default router