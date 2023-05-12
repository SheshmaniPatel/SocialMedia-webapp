 module.exports.index=(request,response)=>{
    return response.json(200, {
        massage:"List of Posts",
        posts:[]
    })
}