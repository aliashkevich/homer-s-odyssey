const express = require('express');
const router = express.Router();
const connection = require('../../helpers/db.js');
const bcrypt = require('bcrypt');

module.exports = router.post('/signup', function(req, res, next) {
  const args = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    name: req.body.name,
    lastname: req.body.lastname,
  };
  connection.query('INSERT INTO users SET ?', args, function(
    error,
    results,
    fields,
  ) {
    if (error) res.status(500).json({flash: error.message});
    else res.status(200).json({signedUp: true});
  });
});

module.exports = router.post('/signin', function(req, res, next) {
  connection.query(
    'SELECT password FROM users WHERE email=?',
    [req.body.email],
    function(error, results, fields) {
      if (error) res.send(500).json({flash: error.message});
      else if (bcrypt.compareSync(req.body.password, results[0].password))
        res.status(200).json({signedIn: true});
      else res.status(404).json({flash: 'Invalid credentials!'});
    },
  );
});
