var express = require('express');
var router = express.Router();
var doc_functions = require('../utils/google');

/* GET home page. */
router.get('/', async (req, res) => {
  let name = req.query.name;
  console.log('Google API request start');
  let part = await doc_functions.loadBalanceRows(name);
  console.log('Google API request end');
  res.send(part);
});

router.get('/distr', async (req, res) => {
  
});

module.exports = router;
