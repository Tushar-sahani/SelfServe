import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const SearchBar = ({ searchQuery, searchResults, handleSearchChange }) => {
  const [Query, setQuery] = useState();

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);
  const navigate = useNavigate();
  const handelSearchResult = () => {
    navigate(`/search?q=${searchQuery}`, {
      state: { searchResults: searchResults, searchQuery: searchQuery },
    });
    setQuery("");
  };
  return (
    <>
      <div className="flex justify-center items-center w-full max-w-3xl gap-2 m-auto relative">
        <input
          type="text"
          value={Query}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full px-6 py-3 border border-gray-300 focus:outline-none"
          placeholder="Search"
        />
        <button
          className="bg-[#4C1A84] md:w-1/5 text-white rounded hover:bg-[#d60b8c] duration-200 px-6 py-3 rounded-r-md"
          onClick={handelSearchResult}
        >
          Search
        </button>

      {searchResults && Query ? (
        <ul className="absolute top-14 md:left-3 bg-white max-md:w-screen md:px-14 p-2 z-20 pb-10">
          {searchResults.length == 0 ? (
            <li>No result found</li>
          ) : (
            searchResults.map((result) => (
              <Link to={`post/${result.id}`} key={result.id}>
                <li className="border-b font-medium text-xl py-3 p-1 ">
                  {result.title.slice(0, 60)}
                  {result.title.length > 60 && "..."}
                </li>
              </Link>
            ))
          )}
        </ul>
      ) : (
        ""
      )}
      </div>

    </>
  );
};

export default SearchBar;
