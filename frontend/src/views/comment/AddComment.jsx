import React, { useState } from "react";
import { MdAccountCircle } from "react-icons/md";
const AddComment = ({ addComment }) => {
  const [commentText, setCommentText] = useState("");

  const handleAddComment = () => {
    addComment(commentText);
    setCommentText("");
  };

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  return (
    <div className="w-full flex space-y-4 border-b pb-4">
      <div className="m-auto pt-3">
        <MdAccountCircle className="text-5xl text-[#0000004d]"/>
      </div>
      <textarea
        placeholder="Add a Comment..."
        onChange={handleCommentChange}
        value={commentText}
        className=" m-4 border-gray-300 w-full resize-none rounded-lg outline-none pt-6 pl-1"
      />
      <div className="flex justify-end">
        <button
          disabled={!commentText}
          type="button"
          onClick={handleAddComment}
          className="px-6 h-10 m-auto rounded-lg text-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition duration-300 ease-in-out"
        >
          Reply
        </button>
      </div>
    </div>
  );
};

export default AddComment;