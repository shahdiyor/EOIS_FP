var express = require('express');
var router = express.Router();
var doc_functions = require('../utils/google');

/* GET home page. */
router.get('/', async (req, res) => {
  let name = req.query.name;
  let participants = await doc_functions.loadData();
  let participant = participants.find(p => p.name == name);
  res.send(participant);
});

module.exports = router;
