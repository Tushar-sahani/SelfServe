const express= require('express');
const axios= require('axios');
const router=express.Router();



router.get('/:id', async(req,res)=>{
    const id=req.params.id;
    try{67890
        const response= await axios.get(`http://172.16.51.78:8081/api/comments/${id}`);
        res.status(200).json(response.data);
    }
    catch(error){
        console.error(`Error fetching user with ID ${id}:`, error.message);
        res.status(500).json({ error: 'Failed to fetch comment' });
    }
});

router.post('/com', async(req,res)=>{
    const commentData=req.body;
    try{
    
    if(!commentData.discription){
        res.status(400).json({error: 'comment is empty'});
    }

    const response= await axios.post('http://172.16.51.78:8081/api/comments',commentData);
    res.status(201).json(response.data);
}
catch(error){
    console.error('Error creating comment:', error.message);
      res.status(500).json({ error: 'Failed to create comment' });
}   
});


router.get('/article/:articleId',async(req,res)=>{
    const articleId=req.params.articleId;
    try{
        if(!articleId){
            res.status(400).json({error:'Invalid Request'});
        }
        const response=await axios.get(`http://172.16.51.78:8081/api/comments/article/${articleId}`);
        res.status(200).json(response.data);
    }
    catch(error){
        console.error(`Error fetching user with ID ${articleId}:`, error.message);
        res.status(500).json({ error: 'Failed to fetch comment' });
    }
});


router.put('/:parentId/addchild',async(req,res)=>{
    const parentId=req.params.parentId;
    const comData=req.body;
    try{
        const response=await axios.put(`http://172.16.51.78:8081/api/comments/${parentId}/addChild`,comData);
        res.status(200).json(response.data);
    }
    catch(error){
        console.error(`Error adding comment with ${parentId}:`, error.message);
        res.status(500).json({ error: 'Failed to add child to comment' });
    }
});

module.exports=router;