import React, { useState } from "react";

const AddReply = ({ setShowReply, parentComment, addReply }) => {
  const [replyText, setReplyText] = useState("");

  const handleAddReply = () => {
    if (replyText) {
      addReply(replyText, parentComment);
      setReplyText("");
      setShowReply(false);
    }
  };

  const handleCommentChange = (e) => {
    setReplyText(e.target.value);
  };

  return (
    <div className="mt-6 flex">
      <textarea
        placeholder="Add a Comment..."
        onChange={handleCommentChange}
        value={replyText}
        className=" m-4 w-1/2 resize-none outline-none pl-1"
      />
      <div className="flex justify-end">
        <button
          disabled={!replyText}
          onClick={handleAddReply}
          type="button"
          className="px-6 h-10 m-auto rounded-lg text-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition duration-300 ease-in-out"
        >
          Reply
        </button>
        </div>
    </div>
  );
};

export default AddReply;