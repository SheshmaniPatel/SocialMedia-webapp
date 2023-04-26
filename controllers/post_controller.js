 const post=require('../models/post');

 module.exports.create=function(request,response){
    post.create({
        content:request.body.content,
        user:request.user._id
    },function(err,Post){
        if(err){
            console.log('Error while posting.....');
            return;
        }
        return response.redirect('back');
    });

 }