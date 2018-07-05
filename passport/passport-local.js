const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const { User } = require("../model/user");
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  "local-signup",
  new LocalStrategy((req, email, password, done) => {
    User.findOne({ email: email }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, false, { message: "user with email already exist." });
      }
      return done(null, user);
    });
  })
);
