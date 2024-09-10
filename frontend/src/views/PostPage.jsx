import React, { useEffect, useState } from "react";
import FiltureTab from "../components/FiltureTab";
import Posts from "../components/Posts";
import Shimmer from "../components/Shimmer";
import { PostData } from "../utils/PostData";
import filterContentModel from "../model/filterContentModel";
import { useSelector } from "react-redux";
import { CiImageOn } from "react-icons/ci";

const PostPage = () => {
  const { filterText } = useSelector((state) => state.filter);
  const { loading, posts, error } = filterContentModel(filterText);

  return (
    <>
      <FiltureTab />
      {loading ? (
        <Shimmer />
      ) : posts.length > 0 ? (
        <Posts posts={posts} />
      ) : (
        <div className="flex items-center justify-center mt-20">
          <div className="text-center">
            <CiImageOn className="text-7xl m-auto" />
            <h1 className="mt-4 text-2xl font-semibold text-gray-700">
              No Posts Yet
            </h1>
          </div>
        </div>
      )}
    </>
  );
};

export default PostPage;
