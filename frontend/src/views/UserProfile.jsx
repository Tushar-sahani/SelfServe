import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { LuMailPlus } from "react-icons/lu";
import { CiImageOn } from "react-icons/ci";
import getProfileModel from "../model/getProfileModel";
import getAllPost from "../model/getAllPost";
import useFormate from "../hooks/useFormate";
import { BiSolidLike } from "react-icons/bi";
import { BsChatDots } from "react-icons/bs";
import { MdVisibility } from "react-icons/md";
import { FaBookReader } from "react-icons/fa";
import { useShortNumber } from "../hooks/useShortNumber";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, error: profileError, loading } = getProfileModel(id);
  
  const { posts } = getAllPost(id);

  const { userInfo } = useSelector((store) => store.auth);

  if (id === userInfo?.id) {
    return navigate(`/profile/${id}`);
  }
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
              <p className="font-bold text-gray-700 text-xl">{posts.length}</p>
              <p className="text-gray-400">Posts</p>
            </div>
          </div>
          <div className="relative">
            <div className="w-32 h-32 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
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
          {posts.length === 0 ? (
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
            <div className="flex flex-col gap-4 items-center max-md:p-2 mb-7 md:w-4/5 lg:w-10/12">
              {posts.map((data) => (
                <div
                  key={data.id}
                  className="relative bg-white shadow-md text-black rounded-sm p-6 mb-4 md:w-80 lg:w-[45vw] m-auto"
                >
                  <Link to={`/post/${data.id}`}>
                    <div className="flex items-center">
                      <img
                        src={data?.user?.profileImage}
                        alt={data?.user?.name}
                        className="md:w-16 md:h-16 w-12 h-12 rounded-full mr-3 cursor-pointer border-2 border-[#d60b8c] hover:border-green-600"
                      />

                      <div>
                        <h2 className="lg:text-lg md:text-md max-md:text-xs w-11/12 font-bold cursor-pointer hover:text-[#d60b8c] mb-1">
                          {data.title}
                        </h2>
                        <div className="text-[#2a2836] text-sm">
                          <span>{data?.user?.name} </span>
                          <span className="mr-2 ml-2">•</span>
                          <span>{useFormate(data.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <div className="md:ml-16 p-2 border-b">
                    <p className="text-gray-700 max-md:hidden mb-4 ">
                      {data.description}
                    </p>
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

                    <div className="flex items-center">
                      <MdVisibility className="mr-1" />
                      <span>{useShortNumber(11143)} </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
