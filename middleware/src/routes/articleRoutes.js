const express= require('express');
const axios= require('axios');
const router=express.Router();

router.post('/' ,async (req,res)=>{
    const articleData=req.body;
    try{
        const response= await axios.post('http://172.16.51.78:8081/api/articles',articleData);
        res.status(200).json(response.data);
    }
    catch(error){
        console.error('Error creating article:', error.message);
        res.status(500).json({ error: 'Failed to create article' });
    }
});

module.exports=router;
// http://172.16.51.78:8081/api/comments