const User = require('../models/user');

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

      res.json({ success: 'true' });
    });
  });
};