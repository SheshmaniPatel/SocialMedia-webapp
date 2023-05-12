const Post = require("../../../models/post");
const Comment=require("../../../models/comment");

module.exports.index = async (request, response) => {
  let posts = await Post.find({})
    .sort("-createdAt")
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });
  return response.status(200).json({
    massage: "List of Posts",
    posts: posts,
  });
};

module.exports.destroy = async (request, response) => {
  try {
    let post = await Post.findById(request.params.id);
    // .id means converting the object id to String
    //   if (post.user == request.user.id) {
    post.remove();

    await Comment.deleteMany({ post: request.params.id });

    return response.status(200).json({
      massage: "Post and associated comments deleted",
    });
    //   } else {
    //     request.flash("error", "You can't delete this post !!");
    //     return response.redirect("back");
    //   }
  } catch (error) {
    console.log("***********",error);
    return response.status(500).json({
      massage: "Internal server error",
    });
  }
};
