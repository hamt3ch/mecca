var passport = require('passport');
var expressSession = require('express-session');

function init(app, User) {
   app.use(expressSession({secret: 'mySecretKey'}));
   app.use(passport.initialize());
   app.use(passport.session());

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  return passport;

}

module.exports = init;
