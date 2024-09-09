import React from "react";
import { useCommentViewModel } from "../viewModels/commentViewModel";
import AddComment from "./comment/AddComment";
import Comment from "./comment/Comment";

const CommentList = () => {
  const { commentList, addComment, deleteComment, addReply } = useCommentViewModel();
  
  return (
    <div>
      <AddComment addComment={addComment} />
      {commentList.firstLevelIds.map((id) => (
        <div key={id} className="md:my-6 my-2 pl-8 max-md:pl-2 flex flex-col">
          <Comment
            commentId={id}
            commentList={commentList}
            deleteComment={deleteComment}
            addReply={addReply}
          />
        </div>
      ))}
    </div>
  );
};

export default CommentList;
