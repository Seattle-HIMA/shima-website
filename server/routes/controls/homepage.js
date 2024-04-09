const express = require('express');
const router = express.Router();
const models = require('../../models.js');

router.get('/', async (req, res) => {
  let info = await models.PageInfoSchema.findOne({ pageTitle: 'Homepage' })
  res.type('text').send('testing');
});

module.exports = router;