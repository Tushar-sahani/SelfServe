import React from "react";
import {Link,Navigate, useNavigate} from "react-router-dom"
const SearchBar = ({
  searchQuery,
  searchResults,
  handleSearchChange,
}) => {
  const navigate = useNavigate();

  
  return (
    <>
      <div className="flex max-md:flex-col justify-center items-center w-full max-w-3xl gap-2 m-auto">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full px-6 py-3 border border-gray-300 focus:outline-none"
          placeholder="Search"
        />
        <button
          className="bg-[#4C1A84] md:w-1/5 text-white rounded hover:bg-[#d60b8c] duration-200 px-6 py-3 rounded-r-md"
        >
          Search
        </button>
      </div>

      {(searchResults && searchQuery)? (
        <ul className="absolute ml-14 bg-white p-2 m-auto w-1/3 z-20">
          {
            searchResults==0?<li>No result found</li>:searchResults.map((result) => (
              <Link to={`post/${result.id}` } key={result.id} ><li  className="border-b font-medium text-xl p-1 ">
                {result.title}
              </li></Link>
            ))}
          
        
        </ul>
      )
    :""}
    </>
  );
};

export default SearchBar;
