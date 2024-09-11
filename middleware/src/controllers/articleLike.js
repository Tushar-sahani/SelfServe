const axios = require("axios");
const responseHandller = require("../response/responseHandller");
const sendError = require("../response/erroHandler");

module.exports.likePost = async (req, res) => {
   //console.log(req.body);
  const { articleId, userId } = req.body;
  if (!req.body.articleId || !req.body.userId) {
    let responseVar = {
      responseCode: "200",
      responseMessage: "ArticleId_Or_UserId_Required",
      responseData: "",
    };
    return res.send(
      responseHandller.transform({
        code: "200",
        message: "Success",
        serviceType: "LIKE_POST",
        apiResponseData: responseVar,
      })
    );
  }
  try {
    //console.log("<<<<<<<<<<<<<<<<<<<<")
    const response = await axios.post(
      `http://localhost:8081/api/articles/${articleId}/likes/${userId}`,
      {}
    );
    //console.log(response.data);
    if (!response.data) {
      let responseVar = {
        responseCode: "200",
        responseMessage: "Like_not_Updated",
        responseData: response.data,
      };
      return res.send(
        responseHandller.transform({
          code: "200",
          message: "Success",
          serviceType: "LIKE_POST",
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
        serviceType: "LIKE_POST",
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
        serviceType: "LIKE_POST",
        apiResponseData: responseVar,
      })
    );
  }
};

module.exports.getLikeCount = async (req, res) => {
  const articleId = req.params.articleId;
  try {
    const response = await axios.get(
      `http://localhost:8081/api/likes/likeCount/${articleId}`,
      likedata
    );
    if (!response.data) {
      let responseVar = {
        responseCode: "200",
        responseMessage: "Failed_to_Fetch_LikeCount",
        responseData: response.data,
      };
      return res.send(
        responseHandller.transform({
          code: "200",
          message: "Success",
          serviceType: "GET_LIKE_COUNT",
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
        serviceType: "GET_LIKE_COUNT",
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
        serviceType: "GET_LIKE_COUNT",
        apiResponseData: responseVar,
      })
    );
  }
};

module.exports.unLikeArticle = async (req, res) => {
  const { articleId, userId } = req.body;
  // console.log(articleId, userId);
  if (!req.body.articleId || !req.body.userId) {
    let responseVar = {
      responseCode: "200",
      responseMessage: "ArticleId_Or_UserId_Required",
      responseData: "",
    };
    return res.send(
      responseHandller.transform({
        code: "200",
        message: "Success",
        serviceType: "LIKE_POST",
        apiResponseData: responseVar,
      })
    );
  }
  try {
    const response = await axios.delete(
      `http://localhost:8081/api/articles/${articleId}/likes/${userId}`
    );
    //console.log(response);
    if (!response.data) {
      let responseVar = {
        responseCode: "200",
        responseMessage: "Failed_to_UnlikeArticle",
        responseData: response.data,
      };
      return res.send(
        responseHandller.transform({
          code: "200",
          message: "Success",
          serviceType: "UNLIKE_ARTICLE",
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
        serviceType: "UNLIKE_ARTICLE",
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
        serviceType: "UNLIKE_ARTICLE",
        apiResponseData: responseVar,
      })
    );
  }
};



