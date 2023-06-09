const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async function (request, response) {
  try {
    let post = await Post.create({
      content: request.body.content,
      user: request.user._id,
    });

    if (request.xhr) {
     // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
    //  post = await post.populate('user', 'name').execPopulate();

      return response.status(200).json({
        data: {
          post: post,
        },
        massage: "Post Created !",
      });
    }

    request.flash("success", "Post created");
    return response.redirect("back");

  } catch (error) {
    request.flash("error", error);
    // added this to view the error on console as well
    console.log(error);
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

      if (request.xhr) {
        return response.status(200).json({
          data: {
            post_id: request.params.id,
          },
          massage: "Post deleted  !",
        });
      }

      request.flash(
        "success",
        "Post and associated commets deleted succesfully!! "
      );

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
