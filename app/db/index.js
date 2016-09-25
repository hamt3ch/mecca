const mongo = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const assert = require('assert');

function init(config){
  // Connection URL for db
  var url = config.db.url;

  // Connect mongoose as well
  mongoose.connect(url, function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server w/ mongoose");
  });
}

module.exports = init;
