import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilter } from "../redux/slices/filterTabSlice";

const FiltureTab = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("recentpost");

  const handleClick = (tab) => {
    setActiveTab(tab);
    dispatch(updateFilter(tab));
  };

  return (
    <div className="container mx-auto py-8 relative">
      <div className="flex items-center flex-wrap justify-center after:content-[''] lg:after:w-[78%] after:w-[80%]  after:bottom-8 after:h-0.5 after:bg-[#d60b8c] after:absolute">
        <button
          className={`px-6 py-3 font-medium  rounded-sm transition duration-300 ease-in-out  ${
            activeTab === "recentpost"
              ? "bg-[#d60b8c] text-white"
              : "text-black hover:bg-[#4C1A84]"
          }`}
          onClick={() => handleClick("recentpost")}
        >
          Recent Post
        </button>
        <button
          className={`px-6 py-3 font-medium  rounded-sm transition duration-300 ease-in-out ${
            activeTab === "toppost"
              ? "bg-[#d60b8c] text-white "
              : "text-black hover:bg-[#4C1A84]"
          }`}
          onClick={() => handleClick("toppost")}
        >
          Top Post
        </button>
        <button
          className={`px-6 py-3 font-medium  rounded-sm transition duration-300 ease-in-out ${
            activeTab === "mostliked"
              ? "bg-[#d60b8c] text-white"
              : "text-black hover:bg-[#4C1A84]"
          }`}
          onClick={() => handleClick("mostliked")}
        >
          Most Liked
        </button>
        <button
          className={`px-6 py-3 font-medium  rounded-sm transition duration-300 ease-in-out ${
            activeTab === "mostcommented"
              ? "bg-[#d60b8c] text-white"
              : "text-black hover:bg-[#4C1A84]"
          }`}
          onClick={() => handleClick("mostcommented")}
        >
          Most Commented
        </button>
        <button
          className={`px-6 py-3 font-medium rounded-sm transition duration-300 ease-in-out ${
            activeTab === "answered"
              ? "bg-[#d60b8c] text-white "
              : "text-black hover:bg-[#4C1A84]"
          }`}
          onClick={() => handleClick("answered")}
        >
          Answered
        </button>
        <button
          className={`px-6 py-3 font-medium  rounded-sm transition duration-300 ease-in-out ${
            activeTab === "notanswered"
              ? "bg-[#d60b8c] text-white"
              : "text-black hover:bg-[#4C1A84]"
          }`}
          onClick={() => handleClick("notanswered")}
        >
          Not Answered
        </button>
        
      </div>
    </div>
  );
};

export default FiltureTab;
