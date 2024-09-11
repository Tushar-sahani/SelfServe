const responseHandller = require("../response/responseHandller");
const sendError = require("../response/erroHandler");
const jwt = require("jsonwebtoken");
const axios = require("axios");

module.exports.login = async (req, res) => {
  // console.log(req.body.email);
  // res.send(req.data);
  const { email, password } = req.body;
  try {
    const response = await axios.get(
      `http://localhost:8081/api/login/email/${email}`
    );
    // const response={
    //   "email":"example@example.com",
    //   "password":"1234"
    // }
    //console.log(user.data);
    const user = response.data;
    //console.log(user);
    if (!user.email) {
      let responseVar = {
        responseCode: "404",
        responseMessage: "Invalid E-mail",
        responseData: "",
      };
      return res.send(
        sendError.sendError({
          code: "200",
          message: "Success",
          serviceType: "LOGIN",
          apiResponseData: responseVar,
        })
      );
    }
    if (user.password != password) {
      let responseVar = {
        responseCode: "403",
        responseMessage: "Invalid Password",
        responseData: "",
      };
      return res.send(
        sendError.sendError({
          code: "200",
          message: "Success",
          serviceType: "LOGIN",
          apiResponseData: responseVar,
        })
      );
    }

    const token = jwt.sign(user, process.env.MY_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.setHeader("Authorization", `Bearer ${token}`);

    res.cookie("toekn", token, {
      httpOnly: true,
    });
    // res.send("<<<<<<<<<<<<")
    const temp = await axios.get(
      `http://localhost:8081/api/users/email/${user.email}`
    );
    let responseVar = {
      responseCode: "200",
      responseMessage: "Success",
      responseData: temp.data,
      token: token,
    };
    return res.send(
      responseHandller.transform({
        serviceType: "LOGIN",
        apiResponseData: responseVar,
      })
    );
  } catch (error) {
    //console.log(error);
    let responseVar = {
      responseCode: "500",
      responseMessage: error,
      responseData: "",
    };
    return res.send(
      sendError.sendError({
        code: "401",
        message: "Bad_request",
        serviceType: "LOGIN",
        apiResponseData: responseVar,
      })
    );
  }
};

module.exports.saveUserDetails = async (req, res) => {
  const { email } = req.body;
  const userData = req.body;
  //console.log(req.body);
  try {
    if (!email) {
      let responseVar = {
        responseCode: "500",
        responseMessage: "Email_required",
        responseData: "",
      };
      return res.send(
        responseHandller.transform({
          code: "200",
          message: "Success",
          serviceType: "",
          apiResponseData: responseVar,
        })
      );
    }
    const ip =
      (req.headers["x-forwarded-for"] || "").split(",").pop().trim() ||
      req.socket.remoteAddress;
    //console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", ip)

    userData.ipAddress = ip;

    //console.log(userData);
    const response = await axios.patch(
      `http://localhost:8081/api/users/${email}/updateLocationAndBrowserInfo`,
      userData
    );
    //console.log(response.data)
    if (!response.data) {
      let responseVar = {
        responseCode: "500",
        responseMessage: "Error",
        responseData: response.data,
      };
      return res.send(
        responseHandller.transform({
          code: "400",
          message: "Success",
          serviceType: "",
          apiResponseData: responseVar,
        })
      );
    }
    let responseVar = {
      responseCode: response.status || "200",
      responseMessage: "Success",
      responseData: response.data,
    };
    return res.send(
      responseHandller.transform({
        code: "200",
        message: "Success",
        serviceType: "SAVE_USER_DETAILS",
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
        code: "401",
        message: "Bad_request",
        serviceType: "LOGIN",
        apiResponseData: responseVar,
      })
    );
  }
};
