import React, { useState } from "react";
import AddReply from "./AddReply";
import { useSelector,useDispatch } from "react-redux";
const Comment = ({ commentId, commentList, deleteComment, addReply }) => {
  const [showReply, setShowReply] = useState(false);
  const comment = commentList[commentId];
  const dispatch = useDispatch();
  const handleDeleteComment = () => {
    deleteComment(commentId);
  };

  const handleReplyComment = () => {
    setShowReply(prev=>!prev);
  };
const {isAuthenticated,userInfo} = useSelector(store=>store.auth);
console.log(userInfo);

  return (
    <>
      <div className="relative items-center overflow-hidden">
        <div className="flex">
          <img
            src={userInfo?.profileImage}
            alt="articles"
            className="md:w-12 md:h-12 w-10 h-10 object-cover rounded-full mt-2"
          />
          <div className="ml-3 max-md:text-sm">
            <div className="flex md:gap-3 gap-1">
              <span className="font-bold">Tushar Sahani</span>
              <span className="text-[#0000006b] font-semibold">
                {comment.date},
              </span>
              <span className="text-[#0000006b] font-semibold">
                {comment.time}
              </span>
            </div>
            <p className="break-words md:text-lg text-[#000000ca]">{comment.text}</p>
            <div className="flex gap-3 font-semibold">
              <button
                type="button"
                className="text-[#00000071]"
                onClick={handleReplyComment}
              >
                Reply
              </button>
              <button
                type="button"
                className="text-red-800"
                onClick={handleDeleteComment}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      {showReply && (
          <AddReply
            setShowReply={setShowReply}
            parentComment={comment}
            addReply={addReply}
          />
        )}
      <div className="relative inset-0 left-10">
        {comment?.children.map((id) => (
          <div key={id} className="my-6">
            <Comment
              commentId={id}
              commentList={commentList}
              deleteComment={deleteComment}
              addReply={addReply}
              />
          </div>
        ))}
      </div>
       
    </>
  );
};

export default Comment;