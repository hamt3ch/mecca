"use strict";
const mongoose = require('mongoose');

var Schema = mongoose.Schema;

// V1
// var userSchema = new Schema({
//   name : String,
//   age : Number,
//   password: String,
//   DOB : Date,
//   accountID: String
// });

// V2
var userSchema = new Schema({
  appId: String, // hash for what application user is associated with
  provider : String, // passport used to get this data
  data : Object, //meta from what the providers gave
});

module.exports = userSchema;
