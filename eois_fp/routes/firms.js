var express = require('express');
var router = express.Router();
var db = require('../settings/db');

router.get('/', (req, res) => {
  db.any("SELECT id,title_firm,number_firm FROM firms")
  .then(data => {
    if (data && data.length > 0) {
      console.log(data);
      res.send(data);
    } 
  })
  .catch(err => {
    console.log(err);
  })
});

router.post('/firm_part', (req, res) => {
  let params = [
      req.body.title_firm
  ];
  console.log(req.body.title_firm);
  db.any("SELECT name,surname,title_firm FROM participants INNER JOIN firms ON participants.firm_id=firms.id WHERE title_firm=$1",params)
  .then(data => {
      console.log(data);
      res.send(data);
  })
  .catch(err => {
    console.log(err);
  })
});


module.exports = router;

