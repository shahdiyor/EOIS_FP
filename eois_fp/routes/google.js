var express = require('express');
var router = express.Router();
var doc_functions = require('../utils/google');

/* GET home page. */
router.get('/', async (req, res) => {
  let name = req.query.name;
  let participants = await doc_functions.GetCommonBalance();
  let participant = participants.find(p => p.name == name);
  res.send(participant);
});

router.get('/distr', async (req, res) => {
  console.log('Google API request');
  let balance = await doc_functions.loadBalanceRows();
  res.send(balance);
});

module.exports = router;
