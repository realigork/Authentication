const passport = require('passport');
const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session: false }); // we don't want cookie based sessions
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.get('/', requireAuth, function(req, res) {
    res.send({ 'hi': 'there' });
  });
  app.post('/forgot-pass', Authentication.forgotPass);
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
}