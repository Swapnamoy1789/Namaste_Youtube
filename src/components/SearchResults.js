import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { YOUTUBE_SEARCH_RESULTS_API, YOUTUBE_VIDEO_DETAILS_API, API_KEY } from "../utils/constants";

const SearchResults = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      fetchSearchResults(query);
    }
  }, [query]);

  const fetchSearchResults = async (query) => {
    try {
      setError(null); // Reset error state
      const response = await fetch(`${YOUTUBE_SEARCH_RESULTS_API}${query}&key=${API_KEY}`);
      const data = await response.json();

      if (!data.items || data.items.length === 0) {
        setResults([]);
        return;
      }

      const videoIds = data.items.map((item) => item.id?.videoId).filter(Boolean);
      if (videoIds.length === 0) {
        setResults(data.items);
        return;
      }

      const videoDetails = await fetchVideoDetails(videoIds);
      const updatedResults = data.items.map((item, index) => ({
        ...item,
        viewCount: videoDetails[index]?.statistics?.viewCount || "N/A",
      }));

      setResults(updatedResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setError("Failed to fetch search results. Please try again.");
    }
  };

  const fetchVideoDetails = async (videoIds) => {
    try {
      const response = await fetch(`${YOUTUBE_VIDEO_DETAILS_API}${videoIds.join(",")}&key=${API_KEY}`);
      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error("Error fetching video details:", error);
      return [];
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Search Results for "{query}"</h2>

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : results.length === 0 ? (
        <p className="text-gray-600">No results found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((item) => (
            <div key={item.id.videoId} className="bg-white p-2 shadow-md rounded-lg">
              <Link to={`/watch?v=${item.id.videoId}`}>
                <div className="cursor-pointer">
                  <img
                    src={item.snippet.thumbnails.medium.url}
                    alt={item.snippet.title}
                    className="w-full rounded-md"
                  />
                  <h3 className="text-sm font-semibold mt-2">{item.snippet.title}</h3>
                  <p className="text-xs text-gray-600">{item.snippet.channelTitle}</p>
                  <p className="text-xs text-gray-500">{item.viewCount} views</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
