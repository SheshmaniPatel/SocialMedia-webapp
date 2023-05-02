const post = require("../models/post");
const User = require("../models/user");

module.exports.home = (request, response) => {
  //  post.find({}, (err,posts)=>{
  //   return response.render('Home',{
  //     title:'Codial | Home',
  //     posts:posts
  //   });

  //    POpulate the users of each post
  post
    .find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .exec((err, posts) => {
      User.find({}, (err, users) => {
        return response.render("Home", {
          title: "Codial | Home",
          posts: posts,
          all_user: users,
        });
      });
    });
};
