const axios = require("axios");
const express = require("express");
const responseHandller = require("../response/responseHandller");
const sendError = require("../response/erroHandler");
const jwt = require("jsonwebtoken");

module.exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `http://localhost:8081/api/users/${id}`
    );
    if (!response.data) {
      let responseVar = {
        responseCode: "200",
        responseMessage: "User_not_found",
        responseData: response.data,
      };
      return res.send(
        responseHandller.transform({
          code: "200",
          message: "Success",
          serviceType: "GET_USER_BY_ID",
          apiResponseData: responseVar,
        })
      );
    }
    let responseVar = {
      responseCode: "200",
      responseMessage: "Success",
      responseData: response.data,
    };
    return res.send(
      responseHandller.transform({
        serviceType: "GET_USER_BY_ID",
        apiResponseData: responseVar,
      })
    );
  } catch (error) {
    //console.log(error.status);
    let responseVar = {
      responseCode: "500",
      responseMessage: error,
      responseData: "",
    };
    return res.send(
      sendError.sendError({
        serviceType: "GET_USER_BY_ID",
        apiResponseData: responseVar,
      })
    );
  }
};

module.exports.postUser = async (req, res) => {
  try {
    // Extract user data from the request body
    const userData = req.body;
    const { username, name, email, location } = userData;
    if (!username || !name || !email || !location) {
      let responseVar = {
        responseCode: "400",
        responseMessage: "usernmae, name ,email and location are required!",
      };
      return res.send(
        responseHandller.transform({
          serviceType: "POST_USER",
          apiResponseData: responseVar,
        })
      );
    }

    // Make a POST request to the Java backend API to create a new user
    const response = await axios.post(
      "http://localhost:8081/api/users",
      userData
    );

    // Send the created user data back to the client
    let responseVar = {
      responseCode: "200",
      responseMessage: "Success",
      responseData: response.data,
    };
    return res.send(
      responseHandller.transform({
        serviceType: "POST_USER",
        apiResponseData: responseVar,
      })
    );
  } catch (error) {
    let responseVar = {
      responseCode: "500",
      responseMessage: error,
      responseData: "",
    };
    return res.send(
      sendError.sendError({
        code: "200",
        message: "Success",
        serviceType: "POST_USER",
        apiResponseData: responseVar,
      })
    );
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    // Making a GET request to the Java backend API
    const response = await axios.get(
      "http://localhost:8081/api/users/allUsers"
    );

    // Send the data from the Java backend to the client
    // console.log(response.data);
    let responseVar = {
      responseCode: "200",
      responseMessage: "Success",
      responseData: response.data,
    };
    return res.send(
      responseHandller.transform({
        serviceType: "GET_ALL_USER",
        apiResponseData: responseVar,
      })
    );
  } catch (error) {
    let responseVar = {
      responseCode: "500",
      responseMessage: error,
      responseData: "",
    };
    return res.send(
      sendError.sendError({
        code: "200",
        message: "Success",
        serviceType: "GET_ALL_USER",
        apiResponseData: responseVar,
      })
    );
  }
};
