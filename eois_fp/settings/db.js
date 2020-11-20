var pgp = require('pg-promise')();
var db = pgp("postgres://postgres:1@localhost:5432/eois");

module.exports = db;
