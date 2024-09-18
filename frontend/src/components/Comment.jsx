import React, { useEffect, useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import useFormate from "../hooks/useFormate";
import useTimeFormat from "../hooks/useTimeFormat";
import { Link } from "react-router-dom";

const Comment = ({ userId, comment, onEdit, onDelete }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState("");
// console.log(comment.description);
useEffect(()=>{
  setEditedText(comment.description);
},[isEditing])

  console.log(editedText);

  useEffect(()=>{
    setEditedText(comment.text);
  },[comment.text]);

  const handleEditChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleEditSubmit = () => {
    if (!editedText.trim()) return;

    
    onEdit(comment.id, editedText);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(comment.id);
  };

  
  return (
    <div className="relative items-center overflow-hidden ml-10 mt-3">
      <div className="flex">
        {!(comment?.user?.profileImage === null) ? (
          <Link to={`/user/${comment?.user?.id}`}><img
            src={comment?.user?.profileImage}
            alt="user"
            className="md:w-12 md:h-12 w-10 h-10 object-cover rounded-full mt-2"
          /></Link>
        ) : (
          <MdAccountCircle className="text-3xl mt-2" />
        )}
        <div className="ml-3 max-md:text-sm flex-1">
          <div className="flex md:gap-3 gap-1 mb-2">
            <span className="font-bold">{comment?.user?.name}</span>
            <span className="text-[#0000006b] font-semibold">
              {useFormate(comment.createdAtDate)},
            </span>
            <span className="text-[#0000006b] font-semibold">
              {useTimeFormat(comment.createdAtTime)}
            </span>
          </div>
          {isEditing ? (
            <div className="mb-2">
              <textarea
                value={editedText}
                onChange={handleEditChange}
                className="w-full border rounded-md p-2"
              />
              <div className="flex gap-3 mt-2">
                <button
                  onClick={handleEditSubmit}
                  className="px-4 py-2 bg-[#4C1A84] text-white rounded-md"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="break-words md:text-lg text-[#000000ca] mb-2">
              {comment.description}
            </p>
          )}
          {!isEditing &&(comment?.user?.id == userId) && (
            <div className="flex gap-3 font-semibold">
              <button
                type="button"
                className="text-[#00000071]"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button
                type="button"
                className="text-red-800"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
