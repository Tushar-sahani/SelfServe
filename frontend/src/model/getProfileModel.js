import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import getAllPost from "./getAllPost";

const getProfileModel = (id) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState([]);

  const { token } = useSelector((store) => store.auth);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://${import.meta.env.VITE_IP_ADDRESS}:${
            import.meta.env.VITE_PORT
          }/api/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.apiResponseCode === "200") {
          if (response.data.apiResponseData.responseCode === "200") {
            setUser(response.data.apiResponseData.responseData);
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

    fetchProfile();
  }, []);

  return {
    user,
    loading,
    error,
  };
};

export default getProfileModel;
