const User = require("../../../models/user");
const jwt = require("jsonwebtoken");

module.exports.createsession = async (request, response) => {
  try {
    let user = await User.findOne({ email: request.body.email });

    if (!user || user.password != request.body.password) {
      return response.json(422, {
        massage: "Invalid username or password !",
      });
    }

    return response.status(200).json({
      massage:
        "Sign in succesful , here is your token , please keep it secreate !",
      data: {
        token: jwt.sign(user.toJSON(), "codiel", { expiresIn: "100000" }),
      },
    });
  } catch (error) {
    console.log("***********", error);
    return response.status(500).json({
      massage: "Internal server error",
    });
  }
};
