const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const authRouter = require('./routes/auth/auth');
const passport = require('./routes/auth/passport');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.send('youhou');
});

app.use('/auth', authRouter);

app.get('/profile', passport.authenticate('jwt', {session: false}), function(
  req,
  res,
) {
  res.send(req.user);
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

let server = app.listen(process.env.PORT || 5000, function() {
  console.log('Listening on port ' + server.address().port);
});
