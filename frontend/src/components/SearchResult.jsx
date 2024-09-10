import React from "react";
import { useSearchViewModel } from "../viewModels/searchViewModel";
const SearchResults = () => {
  const { SearchResult } = useSearchViewModel();
  console.log(SearchResult);
  
  return <div>this i</div>;
};

export default SearchResults;
