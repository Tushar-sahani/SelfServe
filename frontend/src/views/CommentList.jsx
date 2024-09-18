import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { handelModal } from "../redux/slices/handelLoginSlice";
import Comment from "../components/Comment";
import { MdAccountCircle } from "react-icons/md";
const CommentList = ({
  setTotalComments,
  totalcomment,
  postId,
  token,
  user,
}) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    setComments(totalcomment);
  }, [totalcomment]);

  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const { userInfo, isAuthenticated } = useSelector((store) => store.auth);

  const handelCheckAuth = () => {
    if (!isAuthenticated) {
      dispatch(handelModal(true));
      return;
    }
  };
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(
        `http://${import.meta.env.VITE_IP_ADDRESS}:${
          import.meta.env.VITE_PORT
        }/api/comment/postComment`,
        { articleId: postId, user: user, description: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.apiResponseCode === "200") {
        setTotalComments(response.data.apiResponseData.responseData.comments);

        setNewComment("");
      } else {
        setError(response.data.apiResponseData.responseMessage);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to add comment";
      setError(errorMessage);
    }
  };

  const handleEditComment = async (commentId, updatedText) => {
  
    
    try {
      const response = await axios.patch(
        `http://${import.meta.env.VITE_IP_ADDRESS}:${
          import.meta.env.VITE_PORT
        }/api/comment/editComment/${postId}?commentId=${commentId}`,
        { comment: updatedText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.apiResponseCode === "200") {
        setComments((prev) =>
          prev.map((comment) =>
            comment.id === commentId
              ? { ...comment, description: updatedText }
              : comment
          )
        );
      } else {
        setError(response.data.apiResponseData.responseMessage);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to edit comment";
      setError(errorMessage);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await axios.delete(
        `http://${import.meta.env.VITE_IP_ADDRESS}:${
          import.meta.env.VITE_PORT
        }/api/comment/deleteComment/${postId}?commentId=${commentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.apiResponseCode === "200") {
        setTotalComments((prev) =>
          prev.filter((comment) => comment.id !== commentId)
        );
      } else {
        setError(response.data.apiResponseData.responseMessage);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete comment";
      setError(errorMessage);
    }
  };

  return (
    <div>
      <div className="flex max-md:flex-wrap gap-5">
        <div className="max-md:m-auto">
          {userInfo?.profileImage ? (
            <img
              src={userInfo?.profileImage}
              alt={userInfo?.name}
              className="w-14 rounded-full"
            />
          ) : (
            <MdAccountCircle className="text-4xl text-[#00000066]" />
          )}
        </div>
        <textarea
          onClick={handelCheckAuth}
          className="w-full font-medium text-[#000000b7] resize-none px-2 py-1 outline-none"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
        />
        <button
          onClick={handleAddComment}
          className="bg-[#4C1A84] max-md:m-auto w-20 h-10 text-white hover:text-[#d60b8c] font-medium"
        >
          Post
        </button>
      </div>
      <div>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onEdit={handleEditComment}
            onDelete={handleDeleteComment}
            userId={userInfo?.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentList;
