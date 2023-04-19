const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

//Authantication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },

    function (email, password, done) {
      // Finding a user and establish the Identity
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          console.log("Error in finding the --> passport");
          return done(err);
        }
        if (!user || user.password != password) {
          console.log("Username/Password is not correct !!");
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

// serialise the user to decide which key is to be kept in the cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialise the user from the key in the cookie
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) {
      console.log("Error in finding the --> passport");
      return done(err);
    }
    return done(null, user);
  });
});

module.exports=passport;