"use strict";
const app = require('./app');

// process.env.PORT allows heroku to set the port accordingly
// local = 3000
const port = process.env.PORT || 3000;

app.listen(port, function (err) {
  if (err) {
    throw err;
  }

  console.log(`server is listening on ${port}...`);
});
