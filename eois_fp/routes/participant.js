var express = require('express');
var router = express.Router();
var db = require('../settings/db');

router.post('/', (req, res) => {
    console.log(req.body.id);
    let params = [
      req.body.id
    ];
    console.log(params);
    db.any("SELECT name,participants.id,number_firm FROM participants INNER JOIN firms ON participants.firm_id=firms.id WHERE participants.id=$1", params)
    .then(data => { 
      if (data && data.length ===1) {
        console.log(data[0]);
        res.send(data[0]);
      } else {
        res.send({name: ""});
      }
    })
    .catch(err => {
      console.log(err);
    })
  });
  router.post('/team', (req, res) => {
    let params = [
      req.body.number_firm,
      req.body.id
    ];
    console.log(params);
    db.any("SELECT participants.id,number_firm,surname,name,title_position FROM participants INNER JOIN firms ON participants.firm_id=firms.id INNER JOIN positions ON participants.position_id = positions.id WHERE number_firm=$1 AND participants.id NOT IN ($2)", params)
    .then(data => { 
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    })
  });
  router.put('/add', (req, res) => {
    let params = [
      req.body.surname,
      req.body.name,
      req.body.middle_name,
      req.body.date_of_birth,
      req.body.firm_id,
      req.body.position_id,
      req.body.age,
      req.body.project_id
    ];
    console.log(params);
    db.one("INSERT INTO participants (surname,name,middle_name,date_of_birth,firm_id,position_id,age,project_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id", params)
    .then(data => { 
      console.log(data);
      res.send(data)
    })
    .catch(err => {
      console.log(err);
    })
  });
  module.exports = router;