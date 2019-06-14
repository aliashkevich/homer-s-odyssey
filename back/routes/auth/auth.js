const express = require('express');
const router = express.Router();
const connection = require('../../helpers/db.js');
const bcrypt = require('bcrypt');
const passport = require('./passport');

module.exports = router.post('/signup', function(req, res, next) {
  const args = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
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

module.exports = router.post('/signin', function(req, res) {
  passport.authenticate('local', (err, user, info) => {
    if (err) res.status(500).json({flash: err});
    if (!user) res.status(400).json({flash: info.message});
    if (user) res.status(200).json({signedIn: true});
  })(req, res);
});
