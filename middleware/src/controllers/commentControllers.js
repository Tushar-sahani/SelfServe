const axios = require("axios");
const responseHandller = require("../response/responseHandller");
const sendError = require("../response/erroHandler");

module.exports.getCommentById = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.get(
      `http://localhost:8081/api/comments/${id}`
    );
    if (!response.data) {
      let responseVar = {
        responseCode: response.status || "200",
        responseMessage: "Comment_not_found",
        responseData: response.data,
      };
      return res.send(
        responseHandller.transform({
          code: "200",
          message: "Success",
          serviceType: "GET_COMMENT_BY_ID",
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
        serviceType: "GET_COMMENT_BY_ID",
        apiResponseData: responseVar,
      })
    );
  } catch (error) {
    let responseVar = {
      responseCode: "500",
      responseMessage: "Server_Error",
      responseData: "",
    };
    return res.send(
      sendError.sendError({
        serviceType: "GET_COMMENT_BY_ID",
        apiResponseData: responseVar,
      })
    );
  }
};

module.exports.postComment = async (req, res) => {
  const commentData = req.body;
  if (!commentData.discription) {
    let responseVar = {
      responseCode: "",
      responseMessage: "",
      responseData: "",
    };
    return res.send(
      responseHandller.transform({
        code: "400",
        message: "Discription_is_required",
        serviceType: "POST_COMMENT",
        apiResponseData: responseVar,
      })
    );
  }
  try {
    const response = await axios.post(
      "http://localhost:8081/api/comments",
      commentData
    );
    if (!response.data) {
      let responseVar = {
        responseCode: "200",
        responseMessage: "POST_COMMENT",
        responseData: response.data,
      };
      return res.send(
        responseHandller.transform({
          code: "200",
          message: "Success",
          serviceType: "POST_COMMENT",
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
        serviceType: "POST_COMMENT",
        apiResponseData: responseVar,
      })
    );
  } catch (error) {
    let responseVar = {
      responseCode: "500",
      responseMessage: "Server_Error",
      responseData: "",
    };
    return res.send(
      sendError.sendError({
        serviceType: "POST_COMMENT",
        apiResponseData: responseVar,
      })
    );
  }
};

module.exports.getCommentByArticleId = async (req, res) => {
  const articleId = req.params.articleId;
  try {
    if (!articleId) {
      let responseVar = {
        responseCode: "",
        responseMessage: "",
        responseData: "",
      };
      return res.send(
        responseHandller.transform({
          code: "400",
          message: "ArticleID_is_required",
          serviceType: "GET_COMMENT_BY_ARTICLEID",
          apiResponseData: responseVar,
        })
      );
    }
    const response = await axios.get(
      `http://localhost:8081/api/comments/article/${articleId}`
    );

    if (!response.data) {
      let responseVar = {
        responseCode: "200",
        responseMessage: "GET_COMMENT_BY_ARTICLEID",
        responseData: response.data,
      };
      return res.send(
        responseHandller.transform({
          code: "200",
          message: "Success",
          serviceType: "GET_COMMENT_BY_ARTICLEID",
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
        serviceType: "GET_COMMENT_BY_ARTICLEID",
        apiResponseData: responseVar,
      })
    );
  } catch (error) {
    let responseVar = {
      responseCode: "500",
      responseMessage: "Server_Error",
      responseData: "",
    };
    return res.send(
      sendError.sendError({
        serviceType: "GET_COMMENT_BY_ARTICLEID",
        apiResponseData: responseVar,
      })
    );
  }
};

module.exports.addChildToParntId = async (req, res) => {
  const parentId = req.params.parentId;
  const comData = req.body;
  try {
    const response = await axios.put(
      `http://localhost:8081/api/comments/${parentId}/addChild`,
      comData
    );
    if (!response.data) {
      let responseVar = {
        responseCode: "200",
        responseMessage: "ADD_CHILD_TO_PARENT",
        responseData: response.data,
      };
      return res.send(
        responseHandller.transform({
          code: "200",
          message: "Success",
          serviceType: "ADD_CHILD_TO_PARENT",
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
        serviceType: "ADD_CHILD_TO_PARENT",
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
        serviceType: "ADD_CHILD_TO_PARENT",
        apiResponseData: responseVar,
      })
    );
  }
};

module.exports.deleteCommentById = async (req, res) => {
  const { articleId, commentId } = req.params;
  try {
    const response = await axios.delete(
      `http://localhost:8081/api/articles/${articleId}/comments/${commentId}`
    );
    if (!response.data) {
      let responseVar = {
        responseCode: "200",
        responseMessage: "DELETE_COMMENT_BY_ID",
        responseData: response.data,
      };
      return res.send(
        responseHandller.transform({
          code: "200",
          message: "Success",
          serviceType: "DELETE_COMMENT_BY_ID",
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
        serviceType: "DELETE_COMMENT_BY_ID",
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
        serviceType: "DELETE_COMMENT_BY_ID",
        apiResponseData: responseVar,
      })
    );
  }
};
