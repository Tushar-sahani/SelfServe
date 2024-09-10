import { useState, useEffect } from "react";
import axios from "axios";

const getAllPost = (id) => {
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchAllPost = async () => {
      try {
        const response = await axios.get(
          `http://${import.meta.env.VITE_IP_ADDRESS}:${
            import.meta.env.VITE_PORT
          }/api/article/user/${id}`,
          // {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // }
        );
        
        if (response.data.apiResponseCode === "200") {
          
          if (response.data.apiResponseData.responseCode === 200) { //getting response code in integer not in string should be fixed @@@@@@
        
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

    fetchAllPost();
  }, [id]);

  return {
    posts,
    loading,
    error,
  };
};

export default getAllPost;
