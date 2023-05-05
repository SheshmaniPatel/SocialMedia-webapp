const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = async (request, response) => {
  try {
    let post = await Post.findById(request.body.post);
    if (post) {
      let comment = await Comment.create({
        content: request.body.content,
        post: request.body.post,
        user: request.user._id,
      });

      post.comments.push(comment);
      post.save();

      response.redirect("/");
    }
  } catch (error) {
    console.log("Error", error);
    return;
  }
};

module.exports.destroy = async (request, response) => {
  try {
    let comment = await Comment.findById(request.params.id);
    if (comment.user == request.user.id) {
      let postId = comment.post;

      comment.remove();

      let post = await Post.findByIdAndUpdate(postId, {
        $pull: { comments: request.params.id },
      });

      return response.redirect("back");
    } else {
      return response.redirect("back");
    }
  } catch (error) {
    console.log("Error", error);
    return;
  }
};
