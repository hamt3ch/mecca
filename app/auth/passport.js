function init() {
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

  //list passport supported

}

module.exports = init