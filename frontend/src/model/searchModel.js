import axios from 'axios';

const fetchSearchResults = async (query) => {
  try {
    const response = await axios.get(
      `http://${import.meta.env.VITE_IP_ADDRESS}:${import.meta.env.VITE_PORT}/api/article/title/${query}`
    );
    
    if (response.data.apiResponseCode === "200") {
      if (response.data.apiResponseData.responseCode === '200') {
        return { data: response.data.apiResponseData.responseData, error: null };
      } else {
        return { data: [], error: response.data.apiResponseData.responseMessage };
      }
    } else {
      return { data: [], error: response.data.apiResponseMessage };
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch posts";
    return { data: [], error: errorMessage };
  }
};

export default fetchSearchResults;
