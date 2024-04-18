import { getJSONFile, updateJSONFile } from '../utils/fileUtils.js'
import express from 'express'
import { promises as fs } from 'fs';
const router = express.Router();


// get information from scholarships json files
router.get('/', async (req, res) => {
  try {
    let data = await getJSONFile('./assets/scholarships.json')
    res.json(data);
  } catch(err){
    if (err.code === "ENOENT") {
      res.type('text').status(500).send("file does not exist");
    } else {
      res.type('text').status(500).send({ message: err.message });
    }
  }
});

// update scholarships page information
router.post('/update', async(req, res) => {
  try{
    // get body params
    // section: indicate which section is being updated
    // info:
      // format: "info": {"updatedPart": "title", "updatedInfo": "Testing"}
    let {section, info} = req.body;
    if(section && info){
      let result = ""
      let data = await getJSONFile('./assets/scholarships.json');
      // update json file according to given information
      if(section === "scholarships") {
        result = await updateJSONFile('./assets/scholarships.json', {"title": info.updatedPart, "value": info.updatedInfo})
      } else if (data[section]) {
        result = await updateJSONFile('./assets/scholarships.json', {"title": section[info.updatedPart], "value": info.updatedInfo})
      } else {
        res.type('text').status(400).send(`There's no ${section} section on this page`);
      }

      res.json(result);
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

router.post("/add/winner", async(req, res) => {
  try{
    // get body params
    let {name, scholarships, year, images, description} = req.body;
    if(name && scholarships && year && images && description){
      let winners = await getJSONFile('./assets/scholarships.json');
      winners.name = {
        "year": year,
        "photo": images,
        "description": description
      }

      await fs.writeFile('./assets/scholarships.json', JSON.stringify(winners));
      res.json(winners);
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
})

export default router
