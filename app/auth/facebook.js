
var FacebookStrategy = require('passport-facebook').Strategy;
function facebook(passport,User){
  // list of all the routes available for passport
  passport.use(new FacebookStrategy({
    clientID: "yourClientID",
    clientSecret: "yourSecret",
    callbackURL: "http://localhost:3000/your/callback"
  },

  function(accessToken, refreshToken, profile, done) {
    User.findOne({ 'id' : profile.id},
    function(err, user) {
      if (err) {
        console.log(err);
      } if (!user) {
        // No user found create one
        var newUser = new User({
          appId: 'test_app',
          provider: 'facebook',
          data: {
              'id': profile.id,
              'profile': profile,
              'accessToken': accessToken,
              'refreshToken': refreshToken
          }
        });

        // Save user in db
        newUser.save(function(err){ if (err) {console.log(err);}});
        return done(null, newUser);

      } if (user) {
        // found user
        return done(null, user);
      }
    });
  }
));
}

module.exports = facebook;
