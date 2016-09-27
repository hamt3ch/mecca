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
      });
    }
  ));

  var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: "318092088551180",
    clientSecret: "f5fa7a25f0f042c7f16f78fef2afc04a",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    //console.log(accessToken);
    //console.log(refreshToken);
    //console.log(profile);
    // done(null, null);
    User.findOne({ 'id' : profile.id},
    function(err, user) {
      if (err) {
        console.log(err);
      } if (!user) {
        // No user found create one
        var newUser = new User({
          appId: 'test_app',
          provider: 'facebook',
          data: {
              'id': profile.id,
              'profile': profile,
              'accessToken': accessToken,
              'refreshToken': refreshToken
          }
        });
        
        // Save user in db
        newUser.save(function(err){ if (err) {console.log(err);}});
        return done(null, newUser);

      } if (user) {
        // found user
        return done(null, user);
      }
    });
  }
));

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
  passport.authenticate('facebook'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    //  return access/bearer token w/ user info
    res.json(req.user);
  });

app.post('/success',
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
