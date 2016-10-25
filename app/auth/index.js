const mongoose = require('mongoose');
var schema = require('../user').model;
var User = mongoose.model('User', schema);

module.exports = function(app){

  // init your passport
  var passport = require('./passport')(app, User);

  // give passports to all the different strategies
  var local = require('./local')(passport, User);
  var facebook = require('./facebook')(passport, User);


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
};
