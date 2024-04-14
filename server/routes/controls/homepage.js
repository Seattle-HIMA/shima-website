import express from 'express'
import models from '../../models.js';
import { promises as fs } from 'fs';

const router = express.Router();


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

export default router