import React from "react";
import SearchBar from "../components/SearchBar";
import { useSearchViewModel } from "../viewModels/searchViewModel";
const SearchSection = ({ title, description }) => {
  const { searchQuery, searchResults, handleSearchChange, handleSearchSubmit } =
    useSearchViewModel();
  return (
    <div className="text-black flex flex-col justify-center items-center text-center bg-slate-100  w-full">
      <div className="md:p-20 p-10">
        {title !== null ? (
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">{title}</h1>
        ) : (
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            Welcome to Self<span className="text-[#d60b8c]">Serve</span>
          </h1>
        )}

        {description == null ? (
          <p className="mb-8 max-w-4xl md:text-lg text-sm text-slate-700 mt-10">
            Rapipay’s hub for knowledge and innovation! Discover and share
            valuable insights through employee blogs, connect with peers, and
            contribute your expertise. Explore diverse content, engage in
            meaningful discussions, and enhance your professional growth. Join
            us in building a vibrant community where every idea matters!
          </p>
        ) : (
          <p className="mb-8 max-w-4xl md:text-lg text-sm text-slate-700 mt-10">
            {description}
          </p>
        )}

        <SearchBar
          searchQuery={searchQuery}
          searchResults={searchResults}
          handleSearchChange={handleSearchChange}
          handleSearchSubmit={handleSearchSubmit}
        />
      </div>
    </div>
  );
};

export default SearchSection;
