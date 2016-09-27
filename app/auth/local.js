var LocalStrategy = require('passport-local').Strategy;
function local(passport, User) {
  passport.use('local', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, username, password, done) {
    User.findOne({ 'name' : username },
    function(err, user) {
        // In case of any error, return using the done method
        console.log(user);
        console.log(password);
        console.log(user.password);
        if (err)
          return done(err);
        // Username does not exist, log error & redirect back
        if (!user) {
          console.log('User Not Found with username '+username);
          return done(null, false, "user not found");
        }
        // User exists but wrong password, log the error
        if (user.password != password){
          console.log('Invalid Password');
          return done(null, false, "Invalid password");
        }
        // User and password both match, return user from
        // done method which will be treated like success
        return done(null, user);

      });
    }
  ));
}

module.exports = local;
