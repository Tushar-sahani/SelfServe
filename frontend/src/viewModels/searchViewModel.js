import { useState } from "react";
import { searchService } from "../services/searchService";

export const useSearchViewModel = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleSearchSubmit = async () => {
    if (searchQuery) {
      const results = await searchService(searchQuery);
      setSearchResults(results);
    }
  };

  return {
    searchQuery,
    searchResults,
    handleSearchChange,
    handleSearchSubmit,
  };
};
