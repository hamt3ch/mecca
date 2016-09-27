var FacebookStrategy = require('passport-facebook').Strategy;

function facebook(passport, User){
  passport.use(new FacebookStrategy({
      clientID: "318092088551180",
      clientSecret: "f5fa7a25f0f042c7f16f78fef2afc04a",
      callbackURL: "http://localhost:3000/auth/facebook/callback"
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
