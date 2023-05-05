const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async function (request, response) {
  try {
    await Post.create({
      content: request.body.content,
      user: request.user._id,
    });
    request.flash("success", "Post created");
    return response.redirect("back");
  } catch (error) {
    request.flash("error", error);
    return response.redirect("back");
  }
};

module.exports.destroy = async (request, response) => {
  try {
    let post = await Post.findById(request.params.id);
    // .id means converting the object id to String
    if (post.user == request.user.id) {
      post.remove();

      await Comment.deleteMany({ post: request.params.id });
       
      request.flash("success", "Post and associated commets deleted succesfully!! ");

      return response.redirect("back");
    } else {
      request.flash("error", "You can't delete this post !!");
      return response.redirect("back");
    }
  } catch (error) {
    request.flash("error", error);
    return response.redirect("back");
  }
};
