import React, { useEffect, useState } from "react";
import FiltureTab from "../components/FiltureTab";
import Posts from "../components/Posts";
import Shimmer from "../components/Shimmer";
import { PostData } from "../utils/PostData";
import filterContentModel from "../model/filterContentModel";
import { useSelector } from "react-redux";
import { CiImageOn } from "react-icons/ci";

const PostPage = () => {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const { filterText } = useSelector((state) => state.filter);

  const { posts, error } = filterContentModel(filterText, page, "6");
  useEffect(() => {
    setLoading(false);
  }, [posts]);

  ////console.log(posts);
  const handelPages = (index) => {
    setPage(index);
  };

  useEffect(() => {
    setPage(0);
  }, [filterText]);
  return (
    <>
      <FiltureTab />
      {loading ? (
        <Shimmer size={10} />
      ) : posts?.content?.length > 0 ? (
        <Posts posts={posts.content} />
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
      <div className="w-full border-t border-gray-200 font-mono mt-16">
        <div className="flex text-2xl flex-wrap justify-center text-gray-700 -mt-px">
          {Array(posts.totalPages)
            .fill(null)
            ?.map((_, i) => (
              <button
                key={i}
                onClick={() => handelPages(i)}
                className={`p-2 mx-1 ${
                  page === i ? "text-[#d60b8c] border-t-2 border-[#d60b8c]" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
        </div>
      </div>
    </>
  );
};

export default PostPage;
