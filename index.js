const express=require('express');
const app=express();
const port=7000;
const path = require('path');
const expresslayout=require('express-ejs-layouts');

//Calling static for use
app.use(express.static('assets'));

//Extracting style and script from sub pages to layouts
app.set('layout extactStyles',true);
app.set('layout extactScripts',true);

//Calling express layout before routes 
app.use(expresslayout);

// Calling routes
app.use('/',require('./routes'));

//Setup our view engine
app.set('view engine','ejs');
app.set('views','./views');

//Updating on the port
app.listen(port,(err)=>{
    if(err){
        console.log(`Error while running on the port :${err}`);
        return;
    }
    console.log(`Great your server is up on the port no : ${port}`);
    
})