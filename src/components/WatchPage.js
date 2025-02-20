import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import { API_KEY } from "../utils/constants";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const [videoDetails, setVideoDetails] = useState(null);
  const [channelDetails, setChannelDetails] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeMenu());
    if (videoId) {
      fetchVideoDetails(videoId);
    }
  }, [videoId]);

  const fetchVideoDetails = async (videoId) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`
      );
      const data = await response.json();
      if (data?.items?.length > 0) {
        const videoData = data.items[0];
        setVideoDetails(videoData);
        fetchChannelDetails(videoData.snippet.channelId);
      }
    } catch (error) {
      console.error("Error fetching video details:", error);
    }
  };

  const fetchChannelDetails = async (channelId) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${API_KEY}`
      );
      const data = await response.json();
      if (data?.items?.length > 0) {
        setChannelDetails(data.items[0]);
      }
    } catch (error) {
      console.error("Error fetching channel details:", error);
    }
  };

  if (!videoDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-500">Loading video...</p>
      </div>
    );
  }

  const title = videoDetails?.snippet?.title || "Title not available";
  const channelTitle = videoDetails?.snippet?.channelTitle || "Channel name not available";
  const description = videoDetails?.snippet?.description || "Description not available";
  const viewCount = videoDetails?.statistics?.viewCount || "0";
  const likeCount = videoDetails?.statistics?.likeCount || "0";
  const channelProfilePic = channelDetails?.snippet?.thumbnails?.high?.url || "";

  return (
    <div className="flex flex-col lg:flex-row px-4 md:px-10 max-w-[1400px] mx-auto">
      {/* Main Video Section */}
      <div className="w-full lg:w-3/4">
        <iframe
          className="w-full h-52 sm:h-72 md:h-96 lg:h-[500px] xl:h-[600px] rounded-lg shadow-lg"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>

        {/* Video Title & Channel Info */}
        <div className="mt-5">
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">{title}</h1>

          <div className="flex flex-col sm:flex-row items-start sm:items-center mt-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {channelProfilePic ? (
                  <img src={channelProfilePic} alt="Channel Profile" className="w-10 h-10 rounded-full" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                )}
                <span className="text-sm sm:text-base md:text-lg font-medium">{channelTitle}</span>
              </div>
              <button className="px-3 py-1 sm:px-4 sm:py-2 bg-red-600 text-white rounded-md font-semibold">
                Subscribe
              </button>
            </div>

            <div className="flex items-center gap-3 sm:ml-auto mt-3 sm:mt-0">
              <button className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 rounded-md font-medium flex items-center gap-2">
                👍 <span>{likeCount}</span>
              </button>
              <button className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 rounded-md font-medium">👎</button>
            </div>
          </div>
          <div className="text-gray-600 text-sm mt-2">{viewCount} views</div>

          {/* Video Description */}
          <div className="mt-4 text-gray-700">
            <div className={`whitespace-pre-wrap overflow-hidden ${showFullDescription ? "" : "max-h-20"} transition-all duration-300 ease-in-out`}>
              {description}
            </div>
            <button
              className="mt-2 text-blue-500 font-semibold"
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? "View Less" : "View More"}
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <CommentsContainer />
      </div>

      {/* Live Chat (Responsive) */}
      <div className="w-full lg:w-1/4 mt-4 lg:mt-0 lg:ml-5">
        <LiveChat />
      </div>
    </div>
  );
};

export default WatchPage;
