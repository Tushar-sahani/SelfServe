const express = require('express');
const axios = require('axios');  // Import axios to make HTTP requests
const router = express.Router();
const userController = require("../controllers/userControllers");
const jwtVerify=require("../middleware/auth")
const loginController=require('../controllers/loginController')

// Example GET route that fetches users from the Java backend
router.get('/users/all',jwtVerify.verifyToken, userController.getAllUsers);
router.get('/users/:id',userController.getUserById);
router.post('/users', userController.postUser);
router.post('/users/login' ,loginController.login);
router.patch('/users/login',loginController.saveUserDetails);

module.exports = router;