const express = require('express')
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

/*
* setup db instance with whatever configurations needed
*
* @config   json object to has parameters need to create db instance
*/
var db = require('./db')(config);

// Configuring passport
auth = require('./auth')(app);


// Export app
module.exports = app;
