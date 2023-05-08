{
    // method to submit form data to for new post using Ajax

    let createPost=()=>{
        let newPostForm=$("#new-post-form");

        newPostForm.submit((e)=>{
            e.preventDefault();

            $.ajax({
                type:"post",
                url:'/posts/create',
                data:newPostForm.serialize(),
                success:(data)=>{
                    console.log(data);
                },error:(err)=>{
                    console.log(err.responseText);
                }
            })
        })
    }
    //Methode to create post in DOM
    createPost();
}