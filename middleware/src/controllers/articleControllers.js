const axios = require("axios");
const responseHandller = require("../response/responseHandller");
const sendError = require("../response/erroHandler");
const { json } = require("body-parser");

module.exports.postArticle = async (req, res) => {
  const articleData = req.body.raw;
  //console.log(req.body.raw.tags);
  const { file } = req;
  let path = "";
  if (file) {
    path = file.path;
  }
  let url = "";
  if (path) {
    url = path;
  }
  const { key } = req.params;
  if (!key) {
    let responseVar = {
      responseCode: "200",
      responseMessage: "Key_Is_Not_Defined",
      responseData: "",
    };
    return res.send(
      responseHandller.transform({
        serviceType: "POST_ARTICLE_OR_BLOG",
        apiResponseData: responseVar,
      })
    );
  }
  try {
    articleData.coverImage = url;
    let response = "";
    if (key == "post") {
      response = await axios.post(
        "http://localhost:8081/api/articles",
        articleData
      );
    } else if (key == "blog") {
      response = await axios.post(
        "http://localhost:8081/api/blogs",
        articleData
      );
    }
    if (!response.data) {
      let responseVar = {
        responseCode: "200",
        responseMessage: "Failed_To_Post",
        responseData: response.data,
      };
      return res.send(
        responseHandller.transform({
          serviceType: "POST_ARTICLE",
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
        serviceType: "POST_ARTICLE",
        apiResponseData: responseVar,
      })
    );
  } catch (error) {
    //console.log("@@@@@@@@@@",error)
    let responseVar = {
      responseCode: "500",
      responseMessage: "Failed_to_POST_ARTICLE",
      responseData: "",
    };
    return res.send(
      sendError.sendError({
        code: "200",
        message: "Success",
        serviceType: "POST_ARTICLE",
        apiResponseData: responseVar,
      })
    );
  }
};

module.exports.getArticleByArticleId = async (req, res) => {
  //console.log(req.params);
  const articleId = req.params.articleId;
  try {
    const response = await axios.get(
      `http://localhost:8081/api/articles/${articleId}`
    );
    if (!response.data) {
      let responseVar = {
        responseCode: "200",
        responseMessage: "Article_not_found",
        responseData: response.data,
      };
      return res.send(
        responseHandller.transform({
          code: "200",
          message: "Success",
          serviceType: "GET_ARTICLE_BY_ARTICLE_ID",
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
        serviceType: "GET_ARTICLE_BY_ARTICLE_ID",
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
        serviceType: "GET_ARTICLE_BY_ARTICLE_ID",
        apiResponseData: responseVar,
      })
    );
  }
};

module.exports.getArticleByIdUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const response = await axios.get(
      `http://localhost:8081/api/articles/user/${userId}`
    );
    if (!response.data) {
      let responseVar = {
        responseCode: response.status || "200",
        responseMessage: "Article_not_found",
        responseData: response.data,
      };
      return res.send(
        responseHandller.transform({
          code: "200",
          message: "Success",
          serviceType: "GET_ARTICLE_BY_USER_ID",
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
        serviceType: "GET_ARTICLE_BY_USER_ID",
        apiResponseData: responseVar,
      })
    );
  } catch (error) {
    let responseVar = {
      responseCode: error.status || "500",
      responseMessage: error,
      responseData: "",
    };
    return res.send(
      sendError.sendError({
        serviceType: "GET_ARTICLE_BY_ARTICLE_ID",
        apiResponseData: responseVar,
      })
    );
  }
};

module.exports.getArticleByTitleName = async (req, res) => {
  const titleName = req.params.titleName;
  console.log(titleName);

  try {
    const response = await axios.get(
      `http://localhost:8081/api/articles/title/${titleName}`
    );
    if (!response.data) {
      let responseVar = {
        responseCode: response.status || "200",
        responseMessage: "Article_not_found",
        responseData: response.data,
      };
      return res.send(
        responseHandller.transform({
          code: "200",
          message: "Success",
          serviceType: "GET_ARTICLE_BY_USER_ID",
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
        serviceType: "GET_ARTICLE_BY_USER_ID",
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
        serviceType: "GET_ARTICLE_BY_TITLE_NAME",
        apiResponseData: responseVar,
      })
    );
  }
};

module.exports.patchByArticleId = async (req, res) => {
  const articleData = req.body.raw;
  //console.log(req.body.raw);
  const {articleId}=req.params;
  const { file } = req;
  let path = "";
  if (file) {
    path = file.path;
  }
  let url = "";
  if (path) {
    url = path;
  }
  //console.log(url);
  articleData.coverImage=url;
  try {
    //console.log('%%%%%%%%%%%%%%')
    const response = await axios.patch(
      `http://localhost:8081/api/articles/${articleId}`,
      articleData
    );
    //console.log("@@@@@@@@@@@")
    if (!response.data) {
      let responseVar = {
        responseCode: "200",
        responseMessage: "Article_not_Edited",
        responseData: response.data,
      };
      return res.send(
        responseHandller.transform({
          code: "200",
          message: "Success",
          serviceType: "PATCH_ARTICLE_BY_ARTICLE_ID",
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
        serviceType: "PATCH_ARTICLE_BY_ARTICLE_ID",
        apiResponseData: responseVar,
      })
    );
  } catch (error) {
    //console.log(error.message);
    let responseVar = {
      responseCode: "500",
      responseMessage: error,
      responseData: "",
    };
    return res.send(
      sendError.sendError({
        serviceType: "PATCH_ARTICLE_BY_ARTICLE_ID",
        apiResponseData: responseVar,
      })
    );
  }
};

module.exports.getAllArticle = async (req, res) => {
  //console.log(req.params);
  const { key } = req.params;
  try {
    const response = await axios.get(
      `http://localhost:8081/api/articles/sorted/${key}`
    );
    //console.log(response);
    if (!response.data) {
      let responseVar = {
        responseCode: "200",
        responseMessage: "Article_not_found",
        responseData: response.data,
      };
      return res.send(
        responseHandller.transform({
          code: "200",
          message: "Success",
          serviceType: "GET_ALL_ARTICLE",
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
        serviceType: "GET_ALL_ARTICLE",
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
        serviceType: "GET_ALL_ARTICLE",
        apiResponseData: responseVar,
      })
    );
  }
};

module.exports.deletArticleById = async (req, res) => {
  const { id } = req.params;
  //console.log(id);

  try {
    const response = await axios.delete(
      `http://localhost:8081/api/articles/${id}`
    );
    console.log("##############", response.data);
    if (!response.data) {
      let responseVar = {
        responseCode: "200",
        responseMessage: "Article_not_found",
        responseData: response.data,
      };
      return res.send(
        responseHandller.transform({
          code: "200",
          message: "Success",
          serviceType: "DELETE_ARTICLE",
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
        serviceType: "DELETE_ARTICLE",
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
        serviceType: "DELETE_ARTICLE",
        apiResponseData: responseVar,
      })
    );
  }
};

module.exports.recommedPost = async (req, res) => {
  const postData = req.body;

  try {
    console.log(postData);
    const response = await axios.get(
      "http://localhost:8081/api/articles/recommend",
      postData
    );
    console.log(response.data);

    if (!response.data) {
      let responseVar = {
        responseCode: "200",
        responseMessage: "Failed_to_Fetch_Article",
        responseData: response.data,
      };
      return res.send(
        responseHandller.transform({
          code: "200",
          message: "Success",
          serviceType: "RECOMMEND_POST",
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
        serviceType: "RECOMMEND_POST",
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
        serviceType: "RECOMMEND_POST",
        apiResponseData: responseVar,
      })
    );
  }
};
