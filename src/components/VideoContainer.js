import React, { useState, useEffect } from "react";
import { YOUTUBE_VIDEOS_API, API_KEY } from "../utils/constants";
import VideoCard from "./VideoCard";
import AdVideoCard from "./AdVideoCard";
import { Link } from "react-router-dom";

const VideoContainer = ({ videos: categoryVideos, sidebarOpen }) => {
  const [videos, setVideos] = useState([]);
  const [videoDetails, setVideoDetails] = useState({});

  useEffect(() => {
    if (!categoryVideos || categoryVideos.length === 0) {
      getTrendingVideos();
    } else {
      fetchAdditionalDetails(categoryVideos);
    }
  }, [categoryVideos]);

  const getTrendingVideos = async () => {
    try {
      const response = await fetch(YOUTUBE_VIDEOS_API);
      const data = await response.json();

      setVideos(Array.isArray(data.items) ? data.items : []);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setVideos([]);
    }
  };

  const fetchAdditionalDetails = async (videosList) => {
    const videoIds = videosList.map((video) => video.id?.videoId || video.id).join(",");

    if (!videoIds) return;

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${API_KEY}`
      );
      const data = await response.json();

      if (data.items) {
        const detailsMap = {};
        data.items.forEach((video) => {
          detailsMap[video.id] = {
            viewCount: video.statistics?.viewCount || "N/A",
            likeCount: video.statistics?.likeCount || "N/A",
          };
        });
        setVideoDetails(detailsMap);
      }
    } catch (error) {
      console.error("Error fetching additional video details:", error);
    }
  };

  const displayedVideos = categoryVideos?.length > 0 ? categoryVideos : videos;

  return (
<div
  className={`grid gap-4 p-4 transition-all 
    ${sidebarOpen ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" 
                  : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5"}
  `}
>
{displayedVideos.length > 0 ? (
        displayedVideos.map((video, index) => {
          const videoId = video.id?.videoId || video.id;
          const stats = videoDetails[videoId] || {};
          const viewCount = stats.viewCount || "Loading...";

          return (
            <Link key={videoId} to={`/watch?v=${videoId}`}>
              <div className="bg-white shadow-md rounded-lg p-2 overflow-hidden">
                {index === 0 ? (
                  <AdVideoCard VideoCard={VideoCard} info={{ ...video, viewCount }} />
                ) : (
                  <VideoCard info={{ ...video, viewCount }} />
                )}
              </div>
            </Link>
          );
        })
      ) : (
        <p className="col-span-full text-center text-lg text-gray-500">No videos available</p>
      )}
    </div>
  );
};

export default VideoContainer;
