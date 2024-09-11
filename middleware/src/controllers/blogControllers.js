const axios = require("axios");
const responseHandller = require("../response/responseHandller");
const sendError = require("../response/erroHandler");

module.exports.postBlog = async (req, res) => {
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
  try {
    if (!url) {
      let responseVar = {
        responseCode: "500",
        responseMessage: "Failed_to_POST_BLOG",
        responseData: "",
      };
      return res.send(
        sendError.sendError({
          code: "200",
          message: "Success",
          serviceType: "POST_BLOG",
          apiResponseData: responseVar,
        })
      );
    }
    articleData.coverImage = url;
    const response = await axios.post(
      "http://localhost:8081/api/blogs",
      articleData
    );
    let responseVar = {
      responseCode: "200",
      responseMessage: "Success",
      responseData: response.data,
    };
    return res.send(
      responseHandller.transform({
        serviceType: "POST_BLOG",
        apiResponseData: responseVar,
      })
    );
  } catch (error) {
    //console.log("@@@@@@@@@@",error)
    let responseVar = {
      responseCode: "500",
      responseMessage: "Failed_to_POST_BLOG",
      responseData: "",
    };
    return res.send(
      sendError.sendError({
        code: "200",
        message: "Success",
        serviceType: "POST_BLOG",
        apiResponseData: responseVar,
      })
    );
  }
};

module.exports.getBlogByBlogId = async (req, res) => {
  //console.log(req.params);
  const blogId = req.params.blogId;
  try {
    const response = await axios.get(
      `http://localhost:8081/api/blogs/${blogId}`
    );
    if (!response.data) {
      let responseVar = {
        responseCode: "200",
        responseMessage: "Blog_not_found",
        responseData: response.data,
      };
      return res.send(
        responseHandller.transform({
          code: "200",
          message: "Success",
          serviceType: "GET_BLOG_BY_BLOG_ID",
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
        serviceType: "GET_BLOG_BY_BLOG_ID",
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
        serviceType: "GET_BLOG_BY_BLOG_ID",
        apiResponseData: responseVar,
      })
    );
  }
};

module.exports.getBlogByIdUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const response = await axios.get(
      `http://localhost:8081/api/blogs/user/${userId}`
    );
    if (!response.data) {
      let responseVar = {
        responseCode: response.status || "200",
        responseMessage: "Blog_not_found",
        responseData: response.data,
      };
      return res.send(
        responseHandller.transform({
          code: "200",
          message: "Success",
          serviceType: "GET_BLOG_BY_USER_ID",
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
        serviceType: "GET_BLOG_BY_USER_ID",
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
        serviceType: "GET_BLOG_BY_USER_ID",
        apiResponseData: responseVar,
      })
    );
  }
};

module.exports.getBlogByTitleName = async (req, res) => {
  const titleName = req.params.titleName;
  //console.log(titleName);

  try {
    const response = await axios.get(
      `http://localhost:8081/api/blogs/title/${titleName}`
    );
    if (!response.data) {
      let responseVar = {
        responseCode: response.status || "200",
        responseMessage: "Blog_not_found",
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
        serviceType: "GET_BLOG_BY_TITLE_NAME",
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
        serviceType: "GET_BLOG_BY_TITLE_NAME",
        apiResponseData: responseVar,
      })
    );
  }
};

module.exports.patchByBlogId = async (req, res) => {
  const blogId = req.params.blogId;
  const blogData = req.body;
  try {
    const response = await axios.patch(
      `http://localhost:8081/api/blogs/${blogId}`,
      articleData
    );
    if (!response.data) {
      let responseVar = {
        responseCode: "200",
        responseMessage: "Blog_not_found",
        responseData: response.data,
      };
      return res.send(
        responseHandller.transform({
          code: "200",
          message: "Success",
          serviceType: "PATCH_BLOG_BY_ARTICLE_ID",
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
        serviceType: "PATCH_BLOG_BY_ARTICLE_ID",
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
        serviceType: "PATCH_BLOG_BY_ARTICLE_ID",
        apiResponseData: responseVar,
      })
    );
  }
};

module.exports.getAllBlog = async (req, res) => {
  //console.log(req.params);
  const { key } = req.params;
  try {
    const response = await axios.get(
      `http://localhost:8081/api/blogs/sorted/${key}`
    );
    //console.log(response);
    if (!response.data) {
      let responseVar = {
        responseCode: "200",
        responseMessage: "Blog_not_found",
        responseData: response.data,
      };
      return res.send(
        responseHandller.transform({
          code: "200",
          message: "Success",
          serviceType: "GET_ALL_BLOG",
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
        serviceType: "GET_ALL_BLOG",
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
        serviceType: "GET_ALL_BLOG",
        apiResponseData: responseVar,
      })
    );
  }
};

module.exports.deletBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.delete(
      `http://localhost:8081/api/blogs/${id}`
    );
    if (!response.data) {
      let responseVar = {
        responseCode: "200",
        responseMessage: "Blog_not_found",
        responseData: response.data,
      };
      return res.send(
        responseHandller.transform({
          code: "200",
          message: "Success",
          serviceType: "DELETE_BLOG",
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
        serviceType: "DELETE_BLOG",
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
        serviceType: "DELETE_BLOG",
        apiResponseData: responseVar,
      })
    );
  }
};
