const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const EctractJwtoken = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config');


// Create local strategy for log in
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // Verify this username and password, call done with the user
  // If it isn't correct, call done with false
  User.findOne({ email: email }, function(err, user) {
    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false);
    }

    // compare passwords - is password equal to user.password
    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        return done(err);
      }

      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
});

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
passport.use(localLogin);