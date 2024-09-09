import { useState, useEffect } from "react";
import axios from "axios";

const PostDetailModel = (id) => {
    // console.log(id);
    
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://${import.meta.env.VITE_IP_ADDRESS}:${
            import.meta.env.VITE_PORT
          }/api/article/articleId/${id}`
        );
        // console.log(response);
        
        if (response.data.apiResponseCode === "200") {
          if (response.data.apiResponseData.responseCode === "200") {
            // console.log(response.data.apiResponseData.responseData);
            
            setPosts(response.data.apiResponseData.responseData);
          } else {
            setError(response.data.apiResponseData.responseMessage);
            // console.log(error);
          }
        } else {
          setError(response.data.apiResponseMessage);
        //   console.log(error);
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
  }, [id]);

  return {
    posts,
    loading,
    error,
  };
};

export default PostDetailModel;
