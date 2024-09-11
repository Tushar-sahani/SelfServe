const express = require("express");
const axios = require("axios");
const router = express.Router();
const commentControllers = require("../controllers/commentControllers");
const jwtVerify=require("../middleware/auth");

router.get("/:id", commentControllers.getCommentById);

router.post("/postComment", commentControllers.postComment);

router.get("/article/:articleId",jwtVerify.verifyToken, commentControllers.getCommentByArticleId);

router.put("/:parentId/addchild",jwtVerify.verifyToken, commentControllers.addChildToParntId);

router.delete("/deleteComment/:articleId",jwtVerify.verifyToken,)

module.exports = router;
