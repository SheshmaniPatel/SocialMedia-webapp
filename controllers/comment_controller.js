const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = (request, response) => {
  Post.findById(request.body.post, (err, post) => {
    if (post) {
      Comment.create(
        {
          content: request.body.content,
          post: request.body.post,
          user: request.user._id,
        },
        (err, comment) => {
          //error handling
          post.comments.push(comment);
          post.save();

          response.redirect("/");
        }
      );
    }
  });
};

module.exports.destroy = (request, response) => {
  Comment.findById(request.params.id, (err, comment) => {
    if (comment.user == request.user.id) {
      let postId = comment.post;

      comment.remove();

      Post.findByIdAndUpdate(
        postId,
        { $pull: { comments: request.params.id } },
        (err, post) => {
          return response.redirect("back");
        }
      );
    } else {
      return response.redirect("back");
    }
  });
};
