const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const connection = require('../../helpers/db.js');

module.exports = passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    function(email, password, cb) {
      connection.query('SELECT * FROM users WHERE email=?', [email], function(
        error,
        results,
      ) {
        if (error) cb(error);
        else if (results.length === 0)
          cb(null, false, {message: 'Incorrect email or password.'});
        else if (bcrypt.compareSync(password, results[0].password))
          cb(null, results[0]);
      });
    },
  ),
);
