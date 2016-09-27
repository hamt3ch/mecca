const mongoose = require('mongoose');
var schema = require('../user').model;
var User = mongoose.model('User', schema);

module.exports = function(app){

  // init your passport
  var passport = require('./passport')(app, User);

  // give passports to all the different strategies
  var local = require('./local')(passport, User);

  // list of all the routes available for passport
  app.post('/login',
    passport.authenticate('local'),

var FacebookStrategy = require('passport-facebook').Strategy;

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
