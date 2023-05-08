const post = require("../models/post");
const User = require("../models/user");

module.exports.home = async (request, response) => {
  //  post.find({}, (err,posts)=>{
  //   return response.render('Home',{
  //     title:'Codial | Home',
  //     posts:posts
  //   });

  //    POpulate the users of each post
  try {
    let posts = await post
      .find({})
      .sort("-createdAt")
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });
    let users = await User.find({});
    return response.render("Home", {
      title: "Codial | Home",
      posts: posts,
      all_user: users,
    });
  } catch (error) {
    console.log("Error", error);
    return;
  }
};
