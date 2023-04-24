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

// Serialise the user to decide which key is to be kept in the cookie
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

//Check if user is authanticated
passport.checkAuthentication = function (request, response, next) {
  //if User is signed in then pass the request to the next function(controler action)
  if (request.isAuthenticated()) {
    return next();
  }
  //If user is not signed-in
  return response.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function (request, response, next) {
  //request.user contain the current signed in from session cookie and we are just sending this to local view
  if (request.isAuthenticated()) {
    response.locals.user = request.user;
  }
  next();
};

module.exports = passport;
