const passport = require('passport')
const BasicStrategy = require('passport-http').BasicStrategy
const User = require('../models/user')

// passport.use(new BasicStrategy(
//     (username, password, callback) => {
//         User.findOne({ username: username }, (error, user) => {
//             if (error) { return callback(error) }
//             // No user found with that username 
//             if (!user) { return callback(null, false) }
//             // Make sure the password is correct
//             user.verifyPassword(password, (error, isMatch) => {
//                 console.log(isMatch, user, password)
//                 if (error) { return callback(error) }
//                 // Password did not match
//                 if (!isMatch) { return callback(null, false)}
//                 // Success
//                 return callback(null, user)
//             })
//             // if (!user.verifyPassword(password)) {
//             //     return done(null, false, { message: 'Incorrect password.' });
//             //   }
//             //   //Success
//             //   return done(null, user)
//             })
//     }
// ))
passport.use(new BasicStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        console.log(password)
        if (!user.validPassword(password)) { return done(null, false); }
        console.log('made it her')
        return done(null, user);
      });
    }
  ));


exports.isAuthenticated = passport.authenticate('basic', { session: false })