const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  name : String,
  age : Number,
  DOB : Date,
  accountID: String
});

module.exports = userSchema;
