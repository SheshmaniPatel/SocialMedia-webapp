const passport = require("passport");
const User = require("../models/user");

module.exports.profile = async (request, response) => {
  try {
    let user = await User.findById(request.params.id);
    return response.render("user", {
      title: "user",
      profile_user: user,
    });
  } catch (error) {
    console.log("Error", error);
    return;
  }
};

// For updating the profile details
module.exports.update = async (request, response) => {
  try {
    if (request.user.id == request.params.id) {
      let user = await User.findByIdAndUpdate(request.params.id, request.body);
      request.flash("success","Profile Updated succesfully!!");
      return response.redirect("back");
    } else {
      request.flash("error","Can't update the Profile");
      return response.status(401).send("Unauthorised");
    }
  } catch (error) {
    request.flash("error",error);
    return;
  }
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
module.exports.create = async (request, response) => {
  try {
    if (request.body.password != request.body.confirm_password) {
      return response.redirect("back");
    }

    let user = await User.findOne({ email: request.body.email });

    if (!user) {
      let users = await User.create(request.body);

      return response.redirect("/users/sign-in");
    } else {
      return response.redirect("back");
    }
  } catch (error) {
    console.log("Error", error);
    return;
  }
};

// sign-In and create the session for user
module.exports.createsession = (request, response) => {
  request.flash("success", "Logged in succesfully ");
  return response.redirect("/");
};

//signout
module.exports.destroySession = (request, response, next) => {
  request.flash("success","You are Logged out")
  request.logout((err) => {
    if (err) {
      return next(err);
    } 
   
  });
 
  return response.redirect("/");
};
