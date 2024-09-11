const jwt = require("jsonwebtoken");
const responseHandller = require("../response/responseHandller");
const sendError = require("../response/erroHandler");

module.exports. verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  

  if (!token) {
    let responseVar = {
      responseCode: "",
      responseMessage: "",
      responseData: "",
    };
    return res.send(
      responseHandller.transform({
        code: "403",
        message: "Token_not_Provided",
        serviceType: "VERIFY_TOKEN",
        apiResponseData: responseVar,
      })
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.MY_SECRET_KEY);
    //console.log(decoded);

    const { id, email, password } = decoded; // Attach the decoded payload to the request object
    if (!decoded) {
      let responseVar = {
        responseCode: "",
        responseMessage: "",
        responseData: "",
      };
      return res.send(
        sendError.sendError({
          code: "403",
          message: "Invalid_Token",
          serviceType: "VERIFY_TOKEN",
          apiResponseData: responseVar,
        })
      );
    }
    next();
  } catch (err) {
    let responseVar = {
        responseCode: "",
        responseMessage: "",
        responseData: "",
      };
      return res.send(
        sendError.sendError({
          code: "403",
          message: "Invalid_Token",
          serviceType: "VERIFY_TOKEN",
          apiResponseData: responseVar,
        })
      );
  }
};

