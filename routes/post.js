const express=require('express');
const router=express.Router();

const post_controller=require('../controllers/post_controller');

router.get('/timeline',post_controller.timeline);

module.exports=router;