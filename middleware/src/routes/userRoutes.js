const express = require('express');
const axios = require('axios');  // Import axios to make HTTP requests
const router = express.Router();

// Example GET route that fetches users from the Java backend
router.get('/users/all', async (req, res) => {
  try {
    // Making a GET request to the Java backend API
    const response = await axios.get('http://172.16.51.78:8081/likes/all');
    
    // Send the data from the Java backend to the client
    // console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching users from Java backend:', error.message);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.get('/users/:id', async (req, res) => {
  const { id } = req.params;
    try {
      
      const response = await axios.get(`http://172.16.51.78:8081/api/users/${id}`);
    //   console.log(response.data);
      res.status(200).json(response.data);
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error.message);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  });

  router.post('/users', async (req, res) => {
    try {
      // Extract user data from the request body
      const userData = req.body;
      const {username , name, email, location}=userData;
      if(!username || !name || !email ||!location){
        res.status(400).json({error:'username, name ,email, location are required.'});
      }
  
      // Make a POST request to the Java backend API to create a new user
      const response = await axios.post('http://172.16.51.78:8081/api/users', userData);
      
      // Send the created user data back to the client
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error creating user:', error.message);
      res.status(500).json({ error: 'Failed to create user' });
    }
  });

module.exports = router;