const { response } = require("express");

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

//get the sign-Up data
module.exports.create=(request,response)=>{
// todo later

}

// sign-In and create the session for user
module.exports.createsession=(request,response)=>{
// todo later
}