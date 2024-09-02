// Function to fetch search results

export const fetchSearchResults = async (query) => {
  try {
    const response = await fetch(`/api/search?query=${query}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const results = await response.json();
    return results;
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
};
