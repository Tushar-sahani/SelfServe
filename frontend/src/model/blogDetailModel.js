import { useState, useEffect } from "react";
import axios from "axios";

const blogDetailModel = (id) => {
    // console.log(id);
    
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://${import.meta.env.VITE_IP_ADDRESS}:${
            import.meta.env.VITE_PORT
          }/api/blog/blogId/${id}`
        );
        // console.log(response);
        
        if (response.data.apiResponseCode === "200") {
          if (response.data.apiResponseData.responseCode === "200") {
            // console.log(response.data.apiResponseData.responseData);
            
            setBlog(response.data.apiResponseData.responseData);
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
          error.response?.data?.message || "Failed to fetch blog";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  return {
    blog,
    loading,
    error,
  };
};

export default blogDetailModel;
