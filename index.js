const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=7000;
const expresslayout=require('express-ejs-layouts');
const db=require('./config/mongoose');
 

//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport_local_startgy');

app.use(express.urlencoded());
 
app.use(cookieParser());

//Calling static for use
app.use(express.static('./assets'));

//Extracting style and script from sub pages to layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//Calling express layout before routes 
app.use(expresslayout);



//Setup our view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(session ({
    name:'codeal',
    //TODO change the secreate before the deployement on the server
    secret:'somethingblah',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }
}))

app.use(passport.initialize());
app.use(passport.session());

// Calling routes
app.use('/',require('./routes'));

//Updating on the port
app.listen(port,(err)=>{
    if(err){
        console.log(`Error while running on the port :${err}`);
        return;
    }
    console.log(`Great your server is up on the port no : ${port}`);
    
})