const mongoose = require('mongoose');
var schema = require('../user').model;
var User = mongoose.model('User', schema);

module.exports = function(app){

  //init your passport 
  var passport = require('./passport')(app, User);

  //give passports to all the different strategies
  var local = require('./local')(passport, User);

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
