import React from 'react';
import SearchBar from '../components/SearchBar';
import { useSearchViewModel } from '../viewmodels/searchViewModel';

const SearchView = () => {
  const {
    searchQuery,
    searchResults,
    handleSearchChange,
    handleSearchSubmit
  } = useSearchViewModel();

  return (
    <div>
      <h1>Search Example</h1>
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
        searchResults={searchResults}
      />
    </div>
  );
};

export default SearchView;
