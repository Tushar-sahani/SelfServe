// src/app.js

const express = require('express');
const app = express();
const userRoute = require('./src/routes/userRoutes');  // Adjust path based on your directory structure
const cors = require('cors');
const commentRoutes=require('./src/routes/commentRoutes')
const articleRoute=require('./src/routes/articleRoutes')

// Middleware, routes, etc.
app.use(express.json());
app.use(cors());

// Use the router with the correct path
app.use('/api', userRoute);
app.use('/api/comment',commentRoutes);
app.use('/api/article',articleRoute);

// Define routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;
