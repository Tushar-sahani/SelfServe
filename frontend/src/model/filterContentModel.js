import { useState, useEffect } from "react";
import axios from "axios";

const filterContentModel = (filter,page,size) => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://${import.meta.env.VITE_IP_ADDRESS}:${
            import.meta.env.VITE_PORT
          }/api/article/allArticle/${filter}?page=${page}&size=${size}`
        );

        if (response.data.apiResponseCode === "200") {
          if (response.data.apiResponseData.responseCode === "200") {
            setPosts(response.data.apiResponseData.responseData);
          } else {
            setError(response.data.apiResponseData.responseMessage);
            ////console.log(error);
          }
        } else {
          setError(response.data.apiResponseMessage);
          ////console.log(error);
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Failed to fetch posts";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [filter,page]);

  return {
    posts,
    loading,
    error,
  };
};

export default filterContentModel;
