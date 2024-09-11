import { useEffect, useState } from "react";
import fetchSearchResults from "../model/searchModel";
import { useSelector, useDispatch } from "react-redux";
import { cacheSuggestions } from "../redux/slices/searchSlice";
export const useSearchViewModel = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };
  const dispatch = useDispatch();
  const searchCache = useSelector((store) => store.cache);

  useEffect(() => {
    const timer = setTimeout(() => {
      
      if (searchCache[searchQuery]) {
        
        setSearchResults(searchCache[searchQuery]);
      } else {
        handleSearchSubmit();
      }
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const handleSearchSubmit = async () => {
    if (searchQuery) {
      setLoading(true);
      const { data, error } = await fetchSearchResults(searchQuery);

      setSearchResults(data);
      dispatch(
        cacheSuggestions({
          [searchQuery]: data,
        })
      );
      setError(error);
      setLoading(false);
    }
  };
  return {
    searchQuery,
    searchResults,
    error,
    loading,
    handleSearchChange,
  };
};
