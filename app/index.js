const express = require('express')
const mongo = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const assert = require('assert');
const config = require('./config');
const app = express();
const api = express.Router();

var bodyParser = require('body-parser');

// Connection URL for db
var url = config.db.url;

// Connect mongoose as well
mongoose.connect(url, function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server w/ mongoose");
});

var db = mongoose.connection;

app.use(bodyParser.json());

//List of Products in
require('./user').controller(app);

// apply the routes to our application with the prefix /api
app.use('/api', api);

// Close connection for mongoose
//mongoose.connection.close();

app.get('/', (request, response) => {
  response.send('uRyde Board - Alpha')
})

module.exports = app;
