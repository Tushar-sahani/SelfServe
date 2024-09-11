const express= require('express');
//const axios= require('axios');
const router=express.Router();
const jwtVerify=require("../middleware/auth");
const multer=require('multer');
const {storage}=require('../cloudConfig.js');
const upload=multer({storage});
const blogControllers=require("../controllers/blogControllers.js");




router.post('/', jwtVerify.verifyToken,upload.single('postImage'),blogControllers.postBlog);
router.get( '/blogId/:blogId',blogControllers.getBlogByBlogId);
router.get('/user/:userId',blogControllers.getBlogByIdUserId);
router.get('/title/:titleName', blogControllers.getBlogByTitleName);
router.patch('/:blogId',jwtVerify.verifyToken, blogControllers.patchByBlogId);
router.get("/allBlog/:key",blogControllers.getAllBlog);
router.delete("/deleteBlog/:id",jwtVerify.verifyToken,blogControllers.deletBlogById);

module.exports=router;