var express = require('express');
var router = express.Router();
var db = require('../settings/db');

router.post('/', (req, res) => {
  console.log(req.body.id);
  let params = [
    req.body.id
  ];
  db.any("SELECT name FROM curators WHERE id=$1", params)
  .then(data => {
    if (data && data.length > 0) {
      console.log(data[0]);
      res.send(data[0]);
    } else {
      res.send({name:""});
    }
  })
  .catch(err => {
    console.log(err);
  })
});

module.exports = router;
