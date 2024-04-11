const express = require('express');
const router = express.Router();
const models = require('../../models.js');
const fs = require('fs').promises;

// get information from homepage json files
router.get('/', async (req, res) => {
  try {
    let homepageData = await fs.readFile('./assets/homepage.json', 'utf8');
    let data = JSON.parse(homepageData);
    res.json(data);
  } catch(err){
    if (err.code === "ENOENT") {
      res.type('text').status(500).send("file does not exist");
    } else {
      res.type('text').status(500).send("something went wrong on the server");
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
      let file = await fs.readFile('./assets/homepage.json', 'utf8');
      let data = JSON.parse(file);

      // update json file according to given information
      if(section === "homepage") {
        data[info.updatedPart] = info.updatedInfo
      } else if (data[section]) {
        data.section[info.updatedPart] = info.updatedInfo
      } else {
        response = `There's no ${section} section on this page`
        res.status(400).send(response);
      }

      // write updated info into file
      await fs.writeFile('./assets/homepage.json', JSON.stringify(data));
      res.send("Successfully updated information");
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

module.exports = router;