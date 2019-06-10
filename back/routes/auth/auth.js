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
    if (error) res.status(500).json({flash: error.message});
    else res.status(200).json({flash: 'User has been signed up!'});
  });
});

module.exports = router.post('/signin', function(req, res, next) {
  connection.query(
    'SELECT * FROM users WHERE email=? AND password=?',
    [req.body.email, req.body.password],
    function(error, results, fields) {
      if (error) res.status(500).json({flash: error.message});
      else if (results.length === 0)
        res.status(400).json({flash: 'Invalid credentials!'});
      else res.status(200).json({flash: 'User has been signed in!'});
    },
  );
});
