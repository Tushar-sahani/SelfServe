import axios from 'axios';

const API_URL = 'http://171.16.51.78:5000/api/comments';

// Fetch
export const fetchComments = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

export const postComment = async (newComment) => {
  try {
    const response = await axios.post(API_URL, newComment);
    return response.data;
  } catch (error) {
    console.error('Error posting comment:', error);
    throw error;
  }
};

// Update
export const updateComment = async (id, updatedText) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, { text: updatedText });
    return response.data;
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
};

// Delete
export const deleteComment = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};
