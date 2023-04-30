const express=require('express');
const router=express.Router();
const passport=require('passport');

const post_controller=require('../controllers/post_controller');

 router.post('/create',passport.checkAuthentication,post_controller.create);

module.exports=router;