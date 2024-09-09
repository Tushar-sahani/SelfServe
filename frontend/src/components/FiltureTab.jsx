import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateFilter } from "../redux/slices/filterTabSlice";

const FiltureTab = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("RecentPost");

  useEffect(() => {
    dispatch(updateFilter(activeTab));
  }, [activeTab]);
  const handleClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className=" py-8 relative">
      <div className="flex flex-wrap items-center justify-center after:content-[''] lg:after:w-[70%] after:w-[80%]  after:bottom-8 after:h-0.5 after:bg-[#d60b8c] after:absolute">
        <button
          className={` px-6 py-3 font-medium  rounded-sm transition duration-300 ease-in-out  ${
            activeTab === "RecentPost"
              ? "bg-[#d60b8c] text-white"
              : "text-black"
          }`}
          onClick={() => handleClick("RecentPost")}
        >
          Recent Post
        </button>
        <button
          className={`px-6 py-3 font-medium  rounded-sm transition duration-300 ease-in-out ${
            activeTab === "TopPost" ? "bg-[#d60b8c] text-white " : "text-black "
          }`}
          onClick={() => handleClick("TopPost")}
        >
          Top Post
        </button>
        <button
          className={`px-6 py-3 font-medium  rounded-sm transition duration-300 ease-in-out ${
            activeTab === "MostLiked"
              ? "bg-[#d60b8c] text-white"
              : "text-black "
          }`}
          onClick={() => handleClick("MostLiked")}
        >
          Most Liked
        </button>
        <button
          className={`px-6 py-3 font-medium  rounded-sm transition duration-300 ease-in-out ${
            activeTab === "MostComment"
              ? "bg-[#d60b8c] text-white"
              : "text-black"
          }`}
          onClick={() => handleClick("MostComment")}
        >
          Most Commented
        </button>
        <button
          className={`px-6 py-3 font-medium rounded-sm transition duration-300 ease-in-out ${
            activeTab === "Answered"
              ? "bg-[#d60b8c] text-white "
              : "text-black "
          }`}
          onClick={() => handleClick("Answered")}
        >
          Answered
        </button>
        <button
          to={`/${"mostcommented"}`}
          className={`px-6 py-3 font-medium  rounded-sm transition duration-300 ease-in-out ${
            activeTab === "NotAnswered"
              ? "bg-[#d60b8c] text-white"
              : "text-black"
          }`}
          onClick={() => handleClick("NotAnswered")}
        >
          Not Answered
        </button>
      </div>
    </div>
  );
};

export default FiltureTab;
