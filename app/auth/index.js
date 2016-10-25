const mongoose = require('mongoose');
var schema = require('../user').model;
var User = mongoose.model('User', schema);

module.exports = function(app){

  // init your passport
  var passport = require('./passport')(app, User);

  // give passports to all the different strategies
  var local = require('./local')(passport, User);
  var facebook = require('./facebook')(passport, User);
  var google = require('./google')(passport, User);


// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/connect/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/connect/facebook/callback',
  passport.authenticate('facebook'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    //  return access/bearer token w/ user info
    res.json(req.user);
  });

// GET /connect/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
app.get('/connect/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// GET /connect/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/connect/google/callback',
  passport.authenticate('google'),
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
};
