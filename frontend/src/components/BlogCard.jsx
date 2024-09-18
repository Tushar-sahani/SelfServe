import React from "react";
import { useShortNumber } from "../hooks/useShortNumber";
import blank from "../assets/blank.jpg";
const BlogCard = ({ blog }) => {
  //console.log(blog);

  return (
    <div className="mx-auto mt-4 bg-white rounded-sm overflow-hidden ">
      <div className="p-4">
        <div className=" after:content-[''] after:block after:w-full after:h-0.5 after:bg-[#0000002b]">
          <h2 className="text-xl font-semibold text-[#d60b8c] break-all">
            {blog?.title}
          </h2>
        </div>
        <div className="md:flex mt-4">
          <img
            className="w-72 max-md:w-full m-auto lg:aspect-video md:aspect-square h-48 object-contain"
            src={blog?.coverImage == "" ? blank : blog?.coverImage}
            alt="Blog Cover"
          />
          <div className="md:ml-10 p-2">
            <div className=" max-md:justify-center flex items-center mt-2 text-gray-600 text-sm">
              <span className="mr-2 ">{blog?.user?.name}</span>
              <span>•</span>
              <span className="ml-2 mr-2">
                {blog.editedAt !== null
                  ? "Edited" - blog?.editedAt
                  : blog?.createdAtDate}
              </span>
              <span>•</span>
              <span className="ml-2">{blog?.summary}</span>
            </div>
            <p className="mt-4 max-md:text-center leading-8 tracking-wider text-gray-700">
              {blog?.description}
            </p>
            <div className="mt-4 flex flex-wrap max-md:flex-col items-center justify-between">
              <div className="flex items-center text-gray-500 text-sm">
                <span className="mr-4">
                  {useShortNumber(blog?.likeCount)} Likes
                </span>

                {/* for Views */}
                {/* <span className="mr-4">•</span>
                <span>{useShortNumber(2670 )} views</span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
