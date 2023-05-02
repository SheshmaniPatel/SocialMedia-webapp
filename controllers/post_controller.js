const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = function (request, response) {
  Post.create(
    {
      content: request.body.content,
      user: request.user._id,
    },
    function (err, Post) {
      if (err) {
        console.log("Error while posting.....");
        return;
      }
      return response.redirect("back");
    }
  );
};

module.exports.destroy = (request, response) => {
  Post.findById(request.params.id, (err, post) => {
    // .id means converting the object id to String
    if (post.user == request.user.id) {
      post.remove();

      Comment.deleteMany({ post: request.params.id }, (err) => {
        return response.redirect("back");
      });
    } else {
      return response.redirect("back");
    }
  });
};
