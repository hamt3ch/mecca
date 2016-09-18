var userModel = require('./user')
const mongoose = require('mongoose');

var db = mongoose.connection;

function userController(app){

  /*
    GET: Request to pull all rides currently in DB
  */
  app.get('/user', (req, res) => {
      console.log("this is a get in rides")
  })

  app.post('/user', (req, res) => {
    //Creating User//////////////////////////////////////
    var User = mongoose.model('User', userModel);
    var hugh = new User({
      name : 'Hugh',
      age : 23,
      DOB : '01/01/1915',
      accountID: "hjf32u989h"
    });

    hugh.save()

    res.json(hugh);
    ///////////////////////////////////////////////////////

  })
}

module.exports = userController;
