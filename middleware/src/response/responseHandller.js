exports.transform = (apiResponse) => {
    try {
      let responseVar = {
        apiResponseCode: apiResponse.code || "200",
        apiResponseMessage: apiResponse.message || "Success",
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