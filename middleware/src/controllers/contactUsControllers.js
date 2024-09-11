const axios = require("axios");
const responseHandller = require("../response/responseHandller");
const sendError = require("../response/erroHandler");

module.exports.contatUs = async (req, res) => {
  const contactData = req.body;
  //console.log(req.body);
  try {
    const response = await axios.post(
      "http://localhost:8081/api/contact",
      contactData
    );
    if (!response.data) {
      let responseVar = {
        responseCode: "500",
        responseMessage: "UnsuccessFull_Request",
        responseData: "",
      };
      return res.send(
        responseHandller.transform({
          code: "200",
          message: "Success",
          serviceType: "CONTACT_US",
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
        code: "200",
        message: "Success",
        serviceType: "CONTACT_US",
        apiResponseData: responseVar,
      })
    );
  } catch (error) {
    let responseVar = {
      responseCode: error.status || "500",
      responseMessage: "Server_Error",
      responseData: "",
    };
    return res.send(
      sendError.sendError({
        serviceType: "CONTACT_US",
        apiResponseData: responseVar,
      })
    );
  }
};
