import { useState, useEffect } from "react";
import axios from "axios";

const getAllBlog = (id) => {
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchAllBlog = async () => {
      try {
        const response = await axios.get(
          `http://${import.meta.env.VITE_IP_ADDRESS}:${
            import.meta.env.VITE_PORT
          }/api/blog/user/${id}`,
        );
        
        if (response.data.apiResponseCode === "200") {
          
          if (response.data.apiResponseData.responseCode === 200) { //getting response code in integer not in string should be fixed @@@@@@
        
            setBlogs(response.data.apiResponseData.responseData);
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

    fetchAllBlog();
  }, [id]);

  return {
    blogs,
    loading,
    error,
  };
};

export default getAllBlog;
