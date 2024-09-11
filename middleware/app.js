// src/app.js

const express = require("express");
const app = express();
const userRoute = require("./src/routes/userRoutes"); 
const cors = require("cors");
const commentRoutes = require("./src/routes/commentRoutes");
const articleRoute = require("./src/routes/articleRoutes");
const bodyParser = require('body-parser');
const contactUs=require("./src/routes/contactUsRoutes");
const blog=require("./src/routes/blogRoutes")

// Middleware, routes, etc.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Use the router with the correct path
app.use("/api", userRoute);
app.use("/api/comment", commentRoutes);
app.use("/api/article", articleRoute);
app.use("/api/contactUs", contactUs);
app.use("/api/blog",blog);

// Define routes
app.get("/", (req, res) => {
  res.send("HELLO FROM SERVER!");
});

module.exports = app;
