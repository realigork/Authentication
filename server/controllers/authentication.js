const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function(req, res, next) {
  // See if a user with the given email exists
  const email = req.body.email;
  const password = req.body.password;

  // If email or password is not provided, return an error
  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }

  // If a user with email does exist, return an error
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res.status(422).send({ error: 'Email already exists' });
    }

    // If a user with email does NOT exist, create and save user record
    const user = new User({
      email: email,
      password: password
    });

    // Respond to request indicating the user was created
    user.save(function(err) {
      if (err) {
        return next(err);
      }

      res.json({ token: tokenForUser(user) });
    });
  });
};

exports.signin = function(req, res, next) {
  // User has already authorized, we just need to give him a token
  // Since Strategy passes the 'user' model, we can extract it as req.user
  res.send({ token: tokenForUser(req.user) });
};