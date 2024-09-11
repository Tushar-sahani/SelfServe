const express = require("express");
const router = express.Router();
const jwtVerify=require("../middleware/auth");
const contactUs=require("../controllers/contactUsControllers");


router.post("/",jwtVerify.verifyToken,contactUs.contatUs);


module.exports=router;