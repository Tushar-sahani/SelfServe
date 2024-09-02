import React from "react";
import { recentpost,mostfollowed } from "../utils/SidebarData";
import RecentPost from "../components/RecentPost";

const Sidebar = () => {
  
  return (
    <div className=" p-4 md:mt-8 m-auto">
      {/* Ask a Question Button */}
      <button className="w-full bg-[#4C1A84] hover:bg-[#d60b8c] duration-200 text-white py-2 rounded mb-5 font-bold">
        Post
      </button>

      {/* Highest Followed Section */}

      <div className="mb-8 p-5 bg-white">
        <h2 className="text-lg text-[#d60b8c] mb-4">Most Followed</h2>
        {mostfollowed.map((person, index) => (
          <div key={index} className="flex items-center mb-4">
            <img
              src={person.imgSrc}
              alt={person.name}
              className="w-10 h-10 rounded-full mr-4 cursor-pointer"
            />
            <div>
              <p className="font-semibold hover:text-[#d60b8c] cursor-pointer">{person.name}</p>
              <p className="text-sm text-gray-500">{person.role}</p>
              <p className="text-sm text-gray-500">
                Followers: {person.followers}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Recent Post */}
      <div className="mb-8 p-5 bg-white">
        <h2 className="text-lg text-[#d60b8c] mb-4">Recent Post</h2>
        {recentpost.map((post, index) => (
          <RecentPost post={post} index={index}/>
        ))}
      </div>
      {/* Stats Section */}
      <div className="mb-6 bg-white p-5">
        <h2 className="text-[#d60b8c] text-lg mb-4">Stats</h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-gray-200 rounded">
            <span className="flex items-center">
              <i className="fas fa-question-circle text-gray-700 mr-2"></i>
              Questions (19)
            </span>
          </div>
          <div className="flex items-center justify-between p-2 bg-gray-200 rounded">
            <span className="flex items-center">
              <i className="fas fa-comments text-gray-700 mr-2"></i>
              Answers (44)
            </span>
          </div>
          <div className="flex items-center justify-between p-2 bg-gray-200 rounded">
            <span className="flex items-center">
              <i className="fas fa-star text-gray-700 mr-2"></i>
              Best Answers (4)
            </span>
          </div>
          <div className="flex items-center justify-between p-2 bg-gray-200 rounded">
            <span className="flex items-center">
              <i className="fas fa-user text-gray-700 mr-2"></i>
              Users (236)
            </span>
          </div>
        </div>
      </div>

      {/* Login Section
      <div className="bg-white p-5">
        <h2 className="text-[#d60b8c] text-lg mb-2">Login</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 bg-red-100 border border-[#d60b8baf] rounded focus:outline-none"
          />
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 bg-red-100 border border-red-300 rounded focus:outline-none"
            />
            <button className="absolute top-0 right-0 mt-2 mr-2 text-gray-500">
              Forget
            </button>
          </div>
          <button className="w-full bg-[#d60b8c] text-white py-2 rounded">
            Log in
          </button>
          <div className="flex items-center">
            <input type="checkbox" id="rememberMe" className="mr-2" />
            <label htmlFor="rememberMe" className="text-sm text-red-400">
              Remember Me
            </label>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Sidebar;
