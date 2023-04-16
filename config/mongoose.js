const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1/codeil_Development');


const db=mongoose.connection;

 db.on('err', console.error.bind(console,'Error while connecting to Database'));

 db.once('open',()=>{
    console.log("Conected to database :: MongoDB");
 })

 module.exports=db;