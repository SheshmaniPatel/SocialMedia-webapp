const passport = require("passport");
const googlrStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

// Tell passport to use a new strategy for google login
passport.use(
  new googlrStrategy(
    {
      clientID:
        "333815989331-k17i5c2vl9ce2u26ujdsv2porijkbfhf.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:7000/users/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // find the user
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log("erroe in google strategy passport ", err);
          return;
        }

        if (user) {
          // if user found set the user as request.user
          return done(null, user);
        } else {
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              passport: crypto.randomBytes(20).toString("hex"),
            },
            function (err, user) {
              if (err) {
                console.log(
                  "erroe in crating user google strategy passport ",
                  err
                );
                return;
              }

              return done(null, user);
            }
          );
        }
      });
    }
  )
);

module.exports=passport;

