const express= require('express');
//const axios= require('axios');
const router=express.Router();
const articleControllers=require('../controllers/articleControllers');
const jwtVerify=require("../middleware/auth");
const multer=require('multer');
const {storage}=require('../cloudConfig.js');
const upload=multer({storage});
const likeControllers=require('../controllers/articleLike.js');


router.post('/post/:key', jwtVerify.verifyToken,upload.single('postImage'),articleControllers.postArticle);
router.get( '/articleId/:articleId',articleControllers.getArticleByArticleId);
router.get('/user/:userId',articleControllers.getArticleByIdUserId );
router.get('/title/:titleName', articleControllers.getArticleByTitleName);
router.patch('/:articleId',jwtVerify.verifyToken,upload.single('postImage'), articleControllers.patchByArticleId);
router.get("/allArticle/:key",articleControllers.getAllArticle);
router.delete("/deleteArticle/:id",jwtVerify.verifyToken,articleControllers.deletArticleById);
router.get("/recommend",articleControllers.recommedPost);


router.post("/likes",jwtVerify.verifyToken,likeControllers.likePost);
router.get("/likes/:articleId",likeControllers.getLikeCount);
router.delete("/likes",jwtVerify.verifyToken,likeControllers.unLikeArticle);

module.exports=router;
// http://localhost:8081/api/comments