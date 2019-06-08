const express = require('express');
const router = express.Router();
const connection = require('../../helpers/db.js');

module.exports = router.post('/signup', function(req, res, next) {
  const args = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    lastname: req.body.lastname,
  };
  connection.query('INSERT INTO users SET ?', args, function(
    error,
    results,
    fields,
  ) {
    if (error) {
      res
        .status(500)
        .send(error)
        .end();
    } else {
      res.sendStatus(200);
    }
  });
});
