const mongoose = require('mongoose');

var schema = require('../user').model;
var User = mongoose.model('User', schema);

module.exports = function(app){
  var LocalStrategy = require('passport-local').Strategy;
  var passport = require('passport');
  var expressSession = require('express-session');

   app.use(expressSession({secret: 'mySecretKey'}));
   app.use(passport.initialize());
   app.use(passport.session());

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, username, password, done) {
      User.findOne({ 'name' : username },
      function(err, user) {
        // In case of any error, return using the done method
        if (err)
          return done(err);
        // Username does not exist, log error & redirect back
        if (!user){
          console.log('User Not Found with username '+username);
          return done(null, false, "user not found");
        }
        // User exists but wrong password, log the error
        if (user.password != password){
          console.log('Invalid Password');
          return done(null, false, "Invalid password");
        }
        // User and password both match, return user from
        // done method which will be treated like success
        return done(null, user);
      }
    );
    }
  ));

  app.post('/login',
    passport.authenticate('local'),
    function(req, res) {
      // If this function gets called, authentication was successful.
      // `req.user` contains the authenticated user.
      //  return access/bearer token w/ user info
      res.json(req.user);
    });

  app.get('/error', function(req, res) {
    console.log("didnt work");
    res.json({message:"error"});
  });

}
