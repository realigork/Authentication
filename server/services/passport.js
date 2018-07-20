const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const EctractJwtoken = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config');

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: EctractJwtoken.fromHeader('authorization'), // tell the strategy to check authorization in request's header
  secretOrKey: config.secret
};

// Create JWT strategy (payload is JWT token)
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if userID exists in payload
  // If it does, call 'done' with that other
  // Otherwise, call done without a user object
  User.findById(payload.sub, function(err, user) {
    if (err) {
      return done(err, false); // false - no user found
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);