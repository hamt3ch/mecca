"use strict";
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const assert = require('assert');

// Express =======
const app = express();
const api = express.Router();
var session = require('express-session');

// Http Helpers =======
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Connection URL for db
var url = config.db.url;

// Connect mongoose as well
mongoose.connect(url, function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server w/ mongoose");
});

// Configuring passport
var auth = require('./auth')(app);


// Export app
module.exports = app;
