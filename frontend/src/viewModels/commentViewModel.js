// viewmodels/commentViewModel.js
import { useState } from "react";
import { CommentModel } from "../model/CommentModel";
import { getUniqueId } from "../utils/utils";
import useFormate from "../hooks/useFormate"
import useTimeFormat from "../hooks/useTimeFormat";
export const useCommentViewModel = () => {
  
  const currentDateTime = new Date();
  // console.log(currentDateTime.toLocaleDateString('en-CA'));
  
  const date = useFormate(currentDateTime);
  const time = useTimeFormat(currentDateTime.toLocaleTimeString());
  
  
  const [commentList, setCommentList] = useState(CommentModel.comments);

  const addComment = (commentText) => {
    const newComment = {
      id: getUniqueId(),
      text: commentText,
      date:date,
      time:time,
      children: [],
      parentId: null,
    };
    CommentModel.addComment(newComment);
    setCommentList({ ...CommentModel.comments });
  };

  const deleteComment = (commentId) => {
    CommentModel.deleteComment(commentId);
    setCommentList({ ...CommentModel.comments });
  };

  const addReply = (replyText, parentComment) => {
    const newComment = {
      id: getUniqueId(),
      text: replyText,
      date:date,
      time:time,
      children: [],
      parentId: parentComment.id,
    };
    CommentModel.addReply(newComment, parentComment.id);
    setCommentList({ ...CommentModel.comments });
  };

  return {
    commentList,
    addComment,
    deleteComment,
    addReply,
  };
};
