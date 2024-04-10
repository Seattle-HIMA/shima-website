const express = require('express');
const router = express.Router();
const models = require('../../models.js');

// get information from database
router.get('/', async(req, res) => {
  let data = await models.BoardMembers.find({});

  if(data){
    res.json(data);
  }else{
    res.status(401).json({ message: "No board members information existed." });
  }
});

// add new board members
router.post('/add', async (req, res) => {
  try {
    let { username, password, img, about, degree, currJob, first, last } = req.body;
    let newMember = new models.BoardMembers({
      username,
      password,
      first,
      last,
      img,
      about,
      degree,
      currJob
    })
    await newMember.save();
    res.type('text').send({ status: 'success', message: 'Added a new board member successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;