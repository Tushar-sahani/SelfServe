exports.sendError = (apiResponse) => {
    try {
      let responseVar = {
        apiResponseCode: apiResponse.code || "500",
        apiResponseMessage: apiResponse.message || "FAILED",
        apiResponseFrom: `NODE_${apiResponse.serviceType}`,
        apiResponseTime: date,
        apiResponseData: apiResponse.apiResponseData,
      };
      return responseVar;
    } catch (error) {
      let responseVar = {
        apiResponseCode: "500",
        apiResponseMessage: "Can not intiate response" + error,
        apiResponseFrom: "NODE_TRANSFORM_RESPONSE",
        apiResponseTime: date,
        apiResponseData: {},
      };
      return responseVar;
    }
  };

  const date = new Date();