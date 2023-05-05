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
        request.flash("success","Comment done on the post");
      response.redirect("/");
    }
  } catch (error) {
    request.flash("error",error)
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
      request.flash("success","Comment deleted from the post");
      return response.redirect("back");
    } else {
      request.flash("error","Error while deleting");
      return response.redirect("back");
    }
  } catch (error) {
    request.flash("error",error);
    return;
  }
};
