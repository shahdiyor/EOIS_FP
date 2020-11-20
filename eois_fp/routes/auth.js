var express = require('express');
var router = express.Router();
var db = require('../settings/db');

router.post('/', (req, res) => {
  console.log(req.body.login);
  console.log(req.body.password);
  let params = [
    req.body.login,
    req.body.password,
  ];
  console.log(params);
  db.any("SELECT participant_id,curator_id FROM users WHERE login=$1 AND password=$2", params)
  .then(data => { 
    if (data && data.length ===1) {
      console.log(data[0]);
      if (data[0].participant_id === null) {
        data[0].participant_id = 0;
      }
      if (data[0].curator_id === null) {
        data[0].curator_id = 0;
      }
      res.send(data[0]);
    } else {
      res.send({participant_id: 0, name: ""});
    }
  })
  .catch(err => {
    console.log(err);
  })
});

router.put('/logAdd', (req, res) => {
  let params = [
    req.body.login,
    req.body.password,
    req.body.id
  ];
  console.log(params);
  db.one("INSERT INTO users (login,password,participant_id) VALUES ($1,$2,$3) RETURNING id", params)
  .then(data => { 
    console.log(data);
    res.send(data)
  })
  .catch(err => {
    console.log(err);
  })
});

module.exports = router;
