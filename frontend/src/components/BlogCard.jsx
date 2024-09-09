import React from "react";
import { useShortNumber } from "../hooks/useShortNumber";

const BlogCard = ({ blog }) => {
  return (
    <div className="mx-auto mt-4 bg-white rounded-sm overflow-hidden ">
      <div className="p-4">
        <div className=" after:content-[''] after:block after:w-full after:h-0.5 after:bg-[#0000002b]">
          <h2 className="text-xl font-semibold text-[#d60b8c]">{blog.title}</h2>
        </div>
        <div className="md:flex mt-4">
          <img
            className="w-72 max-md:w-full m-auto lg:aspect-video md:aspect-square h-48 object-contain"
            src={blog.coverImg}
            alt="Blog Cover"
          />
          <div className="md:ml-10 p-2">
            <div className=" max-md:justify-center flex items-center mt-2 text-gray-600 text-sm">
              <span className="mr-2 ">{blog.name}</span>
              <span>•</span>
              <span className="ml-2 mr-2">July 21, 2023</span>
              <span>•</span>
              <span className="ml-2">Work</span>
            </div>
            <p className="mt-4 max-md:text-center leading-8 tracking-wider text-gray-700">
              {blog.description}
            </p>
            <div className="mt-4 flex flex-wrap max-md:flex-col items-center justify-between">
              <div className="flex items-center text-gray-500 text-sm">
                <span className="mr-4">{useShortNumber(blog.statistics.likes)} Likes</span>
                <span className="mr-4">•</span>

                <span className="mr-4">
                  {useShortNumber(blog.statistics.comments)} Comments
                </span>
                <span className="mr-4">•</span>

                <span>{useShortNumber(2670 )} views</span>
              </div>
              <button className="bg-[#4C1A84] m-auto text-white px-4 py-2 mt-4 rounded-full hover:bg-red-600">
                Continue reading
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
