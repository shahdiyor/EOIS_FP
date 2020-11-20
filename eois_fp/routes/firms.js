var express = require('express');
var router = express.Router();
var db = require('../settings/db');

router.post('/', (req, res) => {
  db.any("SELECT id,title_firm FROM firms")
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

module.exports = router;
