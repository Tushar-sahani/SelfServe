import React from "react";

const SearchBar = ({ searchQuery, onSearchChange, onSearchSubmit, searchResults }) => {
  return (
    <div className="flex max-md:flex-col justify-center items-center w-full max-w-3xl gap-2 m-auto">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full px-6 py-3 border border-gray-300 focus:outline-none"
        placeholder="Search"
      />
      <button  onClick={onSearchSubmit} className="bg-[#4C1A84] md:w-1/5 text-white rounded hover:bg-[#d60b8c] duration-200 px-6 py-3 rounded-r-md">
        Search
      </button>
      {searchResults && searchResults.length > 0 && (
                <ul>
                    {searchResults.map(result => (
                        <li key={result.id}>{result.name}</li>
                    ))}
                </ul>
            )}
    </div>
  );
};

// const SearchBar = ({ searchQuery, onSearchChange, onSearchSubmit, searchResults }) => {
//     return (
//         <div>
//             <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => onSearchChange(e.target.value)}
//                 placeholder="Search..."
//             />
//             <button onClick={onSearchSubmit}>Search</button>
//             {searchResults && searchResults.length > 0 && (
//                 <ul>
//                     {searchResults.map(result => (
//                         <li key={result.id}>{result.name}</li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

export default SearchBar;
