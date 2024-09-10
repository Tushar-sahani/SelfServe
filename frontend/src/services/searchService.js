import fetchSearchResults  from "../model/searchModel";

export const searchService = async (query) => {
  return await fetchSearchResults(query);
};
