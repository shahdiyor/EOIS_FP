var express = require('express');
var router = express.Router();
var doc_functions = require('../utils/google');

router.get('/', async (req, res) => {
  let name = req.query.name;
  console.log(req.query.name);
  console.log('Google API request start');
  let part = await doc_functions.loadBalanceRows(name);
  console.log('Google API request end');
  console.log(part);
  res.send(part);
});

router.get('/edit', async (req, res) => {
  await doc_functions.editCell(
    req.body.name, 
    req.body.day, 
    req.body.reason,
    req.body.value
  );
  // let params=[
  //   req.body.name, 
  //   req.body.day, 
  //   req.body.reason,
  //   req.body.quantity
  // ]
  // console.log(params);
  //res.send(req.body.succes,"true");
});

router.get('/days', (req, res) => {
  res.send(doc_functions.getDays());
});

module.exports = router;
