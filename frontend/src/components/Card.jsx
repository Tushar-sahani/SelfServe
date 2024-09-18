import React from "react";

import useFormate from "../hooks/useFormate";
import { BiSolidLike } from "react-icons/bi";
import { BsChatDots } from "react-icons/bs";
import { FaBookReader } from "react-icons/fa";
import { useShortNumber } from "../hooks/useShortNumber";

const Card = ({ data }) => {
  return (
    <div className="bg-white shadow-md text-black rounded-sm p-6 mb-4 md:w- lg:w-[45vw] m-auto break-words">
      <div className="flex items-center">
        <img
          src={data?.user?.profileImage}
          alt={data?.user?.name}
          className="md:w-16 md:h-16 w-12 h-12 rounded-full mr-3 cursor-pointer border-2 border-[#d60b8c] hover:border-green-600"
        />

        <div>
          <h2 className="lg:text-lg md:text-md max-md:text-xs font-bold cursor-pointer hover:text-[#d60b8c] mb-1 break-all">
            {data.title}
          </h2>
          <div className="text-[#2a2836] text-sm">
            <span>{data?.user?.name} </span>
            <span className="mr-2 ml-2">•</span>
            <span>{useFormate(data.createdAtDate)}</span>
          </div>
        </div>
      </div>
      <div className="md:ml-16 p-2 border-b">
        <p className="text-gray-700 max-md:hidden mb-4 ">{data.description}</p>
        <p className="text-gray-700 md:hidden max-md:text-sm mb-4">
          {data.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center md:ml-14 md:space-x-8 space-x-3 max-md:justify-evenly text-gray-600 p-3">
        <div className="flex items-center">
          <BiSolidLike className=" mr-1" />
          <span>{useShortNumber(data.likeCount)}</span>
        </div>

        <div className="flex items-center">
          <FaBookReader className="mr-1" />
          <span>{data.readingTimeMinutes} min</span>
        </div>
        <div className="flex items-center">
          <BsChatDots className="mr-1" />
          <span>{useShortNumber(data.commentsCount)} </span>
        </div>

        {/* for views */}
        {/* <div className="flex items-center">
          <MdVisibility className="mr-1" />
          <span>{useShortNumber(11143)} </span>
        </div> */}
      </div>
    </div>
  );
};

export default Card;
