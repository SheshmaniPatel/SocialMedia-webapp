const post = require("../models/post");

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
    .exec((err, posts) => {
      return response.render("Home", {
        title: "Codial | Home",
        posts: posts,
      });
    });
};
