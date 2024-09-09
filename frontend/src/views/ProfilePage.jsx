import React, { useState } from "react";
import Posts from "../components/Posts";
import { LuMailPlus } from "react-icons/lu";
import { CiImageOn } from "react-icons/ci";
import getProfileModel from "../model/getProfileModel";
import { useParams } from "react-router-dom";
import getAllPost from "../model/getAllPost";
const ProfilePage = () => {
  const { id } = useParams();

  const { user, error, loading } = getProfileModel(id);
  const { posts } = getAllPost(id);

  return (
    <div className="md:w-1/2 p-4 md:p-0 m-auto mb-24">
      <div className="p-8 bg-white shadow mt-24 border-t-2 border-[#4C1A84]">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="grid grid-cols-2 text-center order-last md:order-first mt-14 md:mt-0">
            <div>
              <p className="font-bold text-gray-700 text-xl">22</p>
              <p className="text-gray-400">Followers</p>
            </div>
            <div>
              <p className="font-bold text-gray-700 text-xl">10</p>
              <p className="text-gray-400">Posts</p>
            </div>
          </div>
          <div className="relative">
            <div className="w-32  h-32 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              <img
                src={user?.profileImage}
                alt={user?.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          <div className="md:space-x-8 flex justify-evenly mt-20 md:mt-0 md:justify-center">
            <button className="text-white py-2 px-4 uppercase rounded bg-[#4C1A84] hover:bg-[#34115c] shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
              Follow
            </button>
            <button className="text-white py-2 px-4 uppercase rounded bg-[#4C1A84] hover:bg-[#34115c] shadow hover:shadow-lg transition transform hover:-translate-y-0.5">
              <LuMailPlus className="text-3xl" />
            </button>
          </div>
        </div>
        <div className="mt-10 text-center border-b md:pb-12 pb-5">
          <h1 className="text-4xl font-medium text-gray-700">{user.name}</h1>
          <p className="font-light text-gray-600 mt-3">Noida</p>
          <p className="mt-4 text-gray-500">{user.summary}</p>
        </div>
        <div className="md:mt-12 flex flex-col justify-center">
          <p className="text-gray-600 text-center font-light lg:px-16">
            An artist of considerable range, Ryan — the name taken by
            Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and
            records all of his own music, giving it a warm, intimate feel with a
            solid groove structure. An artist of considerable range.
          </p>
        </div>
      </div>
      <div className="p-8 bg-white mt-2">
        <h1 className="text-lg font-bold">All Post</h1>
        <div className="mt-5">
          {posts.length == 0 ? (
            <div className="flex items-center justify-center">
              <div className="text-center">
                <CiImageOn className="text-7xl m-auto" />
                <h1 className="mt-4 text-2xl font-semibold text-gray-700">
                  No Posts Yet
                </h1>
                <p className="mt-2 text-gray-500">
                  When you share posts, they will appear here.
                </p>
              </div>
            </div>
          ) : (
            <Posts posts={posts} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
