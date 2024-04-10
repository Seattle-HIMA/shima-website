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
      res.status(500).send("file does not exist");
    } else {
      res.status(500).send("something went wrong on the server");
    }
  }
});

module.exports = router;