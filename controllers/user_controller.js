const passport = require("passport");
const User = require("../models/user");

module.exports.profile = (request, response) => {
  return response.render("user", {
    title: "user",
  });
};

// render the sign_Up page
module.exports.signUp = (request, response) => {
  if (request.isAuthenticated()) {
    return response.redirect("/users/profile");
  }

  return response.render("user_sign_up", {
    title: "Codeal | Sign Up",
  });
};

// render the sign_In page
module.exports.signIn = (request, response) => {
  if (request.isAuthenticated()) {
    return response.redirect("/users/profile");
  }

  return response.render("user_sign_in", {
    title: "Codeal | Sign In",
  });
};

//get the sign-Up data
module.exports.create = (request, response) => {
  if (request.body.password != request.body.confirm_password) {
    return response.redirect("back");
  }

  User.findOne({ email: request.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding user in Singing up");
      return;
    }

    if (!user) {
      User.create(request.body, function (err, user) {
        if (err) {
          console.log("Error in finding user in Singing up");
          return;
        }
        return response.redirect("/users/sign-in");
      });
    } else {
      return response.redirect("back");
    }
  });
};

// sign-In and create the session for user
module.exports.createsession = (request, response) => {
  return response.redirect("/");
};

//signout
module.exports.destroySession = (request, response, next) => {
  request.logout((err) => {
    if (err) {
      return next(err);
    }
  });
  return response.redirect("/");
};
