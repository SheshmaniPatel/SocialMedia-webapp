const express=require('express');
const app=express();

const port=8000;

app.listen(port,(err)=>{
    if(err){
        console.log(`Error while running on the port :${err}`);
        return;
    }
    console.log(`Great your server is up on the port no : ${port}`);
    
})