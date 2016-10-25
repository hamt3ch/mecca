var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
function google(passport, User){
  passport.use(new GoogleStrategy({
    clientID: "309312327352-775d0a33c0q0m53fltv6cekr8a548lch.apps.googleusercontent.com",
    clientSecret: "DKHUk6W0eF9TlXk5LTexYDiQ",
    callbackURL: "http://localhost:3000/connect/google/callback"
  },

  function(token, tokenSecret, profile, done) {
    User.findOne({ 'id' : profile.id},
    function(err, user) {
      if (err) {
        console.log(err);
      } if (!user) {
        // No user found create one
        var newUser = new User({
          appId: 'testing_google',
          provider: 'google',
          data: {
              'id': profile.id,
              'profile': profile,
              'accessToken': token,
              'tokenSecret': tokenSecret
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

module.exports = google;
