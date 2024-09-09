import { fetchSearchResults } from "../model/searchModel";
// Service function for search
export const searchService = async (query) => {
  return await fetchSearchResults(query);
};
