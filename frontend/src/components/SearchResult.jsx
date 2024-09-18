import React from "react";
import { useLocation } from "react-router-dom";
import { CiImageOn } from "react-icons/ci";
import Posts from "./Posts";
const SearchResults = () => {
  const location = useLocation();
  const { searchResults,searchQuery } = location.state || {};

  console.log(searchResults);

  return (
    <>
    <h1 className="text-3xl text-center p-10 font-bold text-[#000000b9]">Search Result for {searchQuery}</h1>
      {searchResults?.length > 0 ? (
        <Posts posts={searchResults} />
      ) : (
        <div className="flex items-center justify-center mt-20">
          <div className="text-center">
            <CiImageOn className="text-7xl m-auto" />
            <h1 className="mt-4 text-2xl font-semibold text-gray-700">
              No Posts Found
            </h1>
          </div>
        </div>
      )}
      {/* <div className="w-full border-t border-gray-200 font-mono mt-16">
        <div className="flex text-2xl flex-wrap justify-center text-gray-700 -mt-px">
          {Array(searchResults.length)
            .fill(null)
            ?.map((_, i) => (
              <button
                key={i}
                onClick={() => handelPages(i)}
                className={`p-2 mx-1 border-transparent ${
                  page === i ? "text-[#d60b8c] border-2" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
        </div>
      </div> */}
    </>
  );
};

export default SearchResults;
