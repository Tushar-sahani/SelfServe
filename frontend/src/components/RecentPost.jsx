import React from "react";
import useFormate from "../hooks/useFormate";

const RecentPost = ({post,index}) => {
  return (
    <div key={index} className="mb-4">
      <p className=" hover:text-[#d60b8c] cursor-pointer text-base">
        {post.title}
      </p>
      <p className="text-sm text-gray-500">{useFormate(post.createdAt)}</p>
    </div>
  );
};

export default RecentPost;
