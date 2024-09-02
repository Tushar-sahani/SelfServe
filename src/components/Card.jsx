import React from "react";

import useFormate from "../hooks/useFormate";
import { BiSolidLike } from "react-icons/bi";
import { BsChatDots } from "react-icons/bs";
import { MdVisibility } from "react-icons/md";
import { FaBookReader } from "react-icons/fa";
import { useShortNumber } from "../hooks/useShortNumber";
const Card = ({ data }) => {

  
  return (
    <div className="bg-white shadow-md text-black rounded-xl p-6 mb-4 md:w-3/4 lg:w-10/12 m-auto">
      <div className="flex items-center">
        <img
          src={data.profileImg}
          alt={data.name}
          className="md:w-16 md:h-16 w-12 h-12 rounded-full mr-3 cursor-pointer border-2 border-[#d60b8c] hover:border-green-600"
        />

        <div>
          <h2 className="lg:text-lg md:text-md max-md:text-xs font-bold cursor-pointer hover:text-[#d60b8c] mb-1">
            {data.title}
          </h2>
          <div className="text-[#2a2836] text-sm">
            <span>{data.name} </span>
            <span className="mr-2 ml-2">•</span>
            <span>{useFormate(data.postDate)}</span>
           
          </div>
        </div>
      </div>
      <div className="md:ml-16 p-2 border-b">
        <p className="text-gray-700 max-md:hidden mb-4 ">
          {data.content.slice(0, 250)}...
        </p>
        <p className="text-gray-700 md:hidden max-md:text-sm mb-4">
          {data.description.slice(0, 200)}
        </p>
      </div>

      <div className="flex flex-wrap items-center md:ml-14 md:space-x-8 space-x-3 max-md:justify-evenly text-gray-600 p-3">
        <div className="flex items-center">
          <BiSolidLike className=" mr-1" />
          <span>{useShortNumber(data.statistics.likes)}</span>
        </div>

        <div className="flex items-center">
          <FaBookReader className="mr-1" />
          <span>{data.readTime} min</span>
        </div>
        <div className="flex items-center">
          <BsChatDots className="mr-1" />
          <span>{useShortNumber(data.statistics.comments)} </span>
        </div>

        <div className="flex items-center">
          <MdVisibility className="mr-1" />
          <span>{useShortNumber(11143)} </span>
        </div>
      </div>
    </div>
  );
};

export default Card;

{
  /* <div class=" mx-auto bg-white rounded-xl shadow-md overflow-hidden  mb-4  md:w-3/4 lg:w-10/12">
    <div class="md:flex">
        <div class="md:shrink-0">
            <img class="h-48 w-full md:h-full object-cover md:w-96" src={data.coverImg} />
        </div>
        <div class="p-8">
            <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Company retreats</div>
            <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Incredible
                accommodation for your team
            </a>
            <p class="mt-2 text-slate-500">Looking to take your team away on a retreat to enjoy awesome food and take in
                some sunshine? We have a list of places to do just that.
            </p>
        </div>
    </div>
</div> */
}
