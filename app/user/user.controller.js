"use strict";

var userModel = require('./user');
var mongoose = require('mongoose');

function userController(app){
  app.post('/user', (req, res) => {
    //Creating User//////////////////////////////////////
    var User = mongoose.model('User', userModel);
    var hugh = new User({
      name : 'Hugh',
      age : 23,
      DOB : '01/01/1915',
      accountID: "hjf32u989h"
    });

    hugh.save();

    res.json(hugh);
    ///////////////////////////////////////////////////////

  });
}

module.exports = userController;
