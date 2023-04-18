module.exports.profile=(request,response)=>{
 return response.render('user',{
    title:"user"
 });

};

// render the sign_Up page
module.exports.signUp=(request,response)=>{
   return response.render('user_sign_up',{
      title:"Codeal | Sign Up"
   })
}

// render the sign_In page
module.exports.signIn=(request,response)=>{
   return response.render('user_sign_in',{
      title:"Codeal | Sign In"
   })
}