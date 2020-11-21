var express = require('express');
var router = express.Router();
var doc_functions = require('../utils/google');

router.get('/', async (req, res) => {
  let name = req.query.name;
  console.log('Google API request start');
  let part = await doc_functions.loadBalanceRows(name);
  console.log('Google API request end');
  res.send(part);
});

router.get('/edit', async (req, res) => {
  await doc_functions.editCell(
    req.query.name, 
    req.query.day, 
    req.query.reason,
    req.query.value
  );
  res.send('OK');
});

router.get('/days', (req, res) => {
  res.send(doc_functions.getDays());
});

module.exports = router;
