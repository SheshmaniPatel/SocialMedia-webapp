const passport = require("passport");
const JWTstrategy = require("passport-jwt").Strategy;
const extractJWT = require("passport-jwt").ExtractJwt;

const User = require("../models/user");

let opts = {
  jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "codiel",
};

passport.use(
  new JWTstrategy(opts, function (jwtPayload, done) {
    User.findByIdAndDelete(jwtPayload._id, function (err, user) {
      if (err) {
        console.log("error while finding ");
        return;
      }

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);


module.exports=passport;