import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoContainer from "./VideoContainer";
import { API_KEY, YOUTUBE_CATEGORY_VIDEOS_API } from "../utils/constants";

// Category name to YouTube category ID mapping
const CATEGORY_IDS = {
  Movies: "1",
  Music: "10",
  Gaming: "20",
  Sports: "17",
  Technology: "28",
  Education: "27",
  Comedy: "23",
  News: "25",
  Health: "26",
  Travel: "19",
  Lifestyle: "22",
};

const CategoryPage = () => {
  const { categoryId } = useParams(); // Example: "gaming" or "Gaming"
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchCategoryVideos();
  }, [categoryId]); // Fetch new videos when category changes

  const fetchCategoryVideos = async () => {
    try {
      // Convert categoryId to title case for matching (first letter capitalized)
      const formattedCategoryId =
        categoryId.charAt(0).toUpperCase() + categoryId.slice(1).toLowerCase();

      const categoryID = CATEGORY_IDS[formattedCategoryId]; // Convert category name to ID
      if (!categoryID) {
        setVideos([]); // If no matching ID, return empty list
        return;
      }

      const response = await fetch(
        `${YOUTUBE_CATEGORY_VIDEOS_API}${categoryID}&key=${API_KEY}`
      );
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        setVideos(data.items);
      } else {
        setVideos([]); // No videos found
      }
    } catch (error) {
      console.error("Error fetching category videos:", error);
      setVideos([]);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold p-4">
        Videos for Category: {categoryId}
      </h2>
      <VideoContainer videos={videos} />
    </div>
  );
};

export default CategoryPage;