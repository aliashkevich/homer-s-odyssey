const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const connection = require('../../helpers/db.js');
const JWTStrategy = require('passport-jwt').Strategy,
  ExtractJWT = require('passport-jwt').ExtractJwt;

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
          cb(null, false, {message: 'Incorrect email.'});
        else if (!bcrypt.compareSync(password, results[0].password))
          cb(null, false, {message: 'Incorrect password.'});
        else if (bcrypt.compareSync(password, results[0].password))
          cb(null, results[0]);
        else cb(null, false, {message: 'Incorrect email or  password.'});
      });
    },
  ),
);

module.exports = passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_jwt_secret',
    },
    function(jwtPayload, cb) {
      return cb(null, jwtPayload);
    },
  ),
);
