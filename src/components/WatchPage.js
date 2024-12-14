import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeMenu } from '../utils/appSlice';
import { useSearchParams } from 'react-router-dom';
import { GOOGLE_API_KEY } from '../utils/constants';
import CommentsContainer from './CommentsContainer';
import LiveChat from './LiveChat';

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const [videoDetails, setVideoDetails] = useState(null);
  const [channelDetails, setChannelDetails] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeMenu());
    fetchVideoDetails();
  }, []);

  const fetchVideoDetails = async () => {
    try {
      const videoId = searchParams.get('v');
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=` + GOOGLE_API_KEY
      );
      const data = await response.json();
      if (data?.items?.length > 0) {
        const videoData = data.items[0];
        setVideoDetails(videoData);
        fetchChannelDetails(videoData.snippet.channelId);
      } else {
        console.error('No video details found.');
      }
    } catch (error) {
      console.error('Error fetching video details:', error);
    }
  };

  const fetchChannelDetails = async (channelId) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=` + GOOGLE_API_KEY
      );
      const data = await response.json();
      if (data?.items?.length > 0) {
        setChannelDetails(data.items[0]);
      } else {
        console.error('No channel details found.');
      }
    } catch (error) {
      console.error('Error fetching channel details:', error);
    }
  };

  const title = videoDetails?.snippet?.title || 'Title not available';
  const channelTitle = videoDetails?.snippet?.channelTitle || 'Channel name not available';
  const description = videoDetails?.snippet?.description || 'Description not available';
  const viewCount = videoDetails?.statistics?.viewCount || '0';
  const likeCount = videoDetails?.statistics?.likeCount || '0';
  const channelProfilePic = channelDetails?.snippet?.thumbnails?.high?.url || '';

  return (
    <div className="flex flex-col px-5 max-w-[1200px] mx-auto">
      {/* Main Content */}
      <div className="flex">
        {/* Video Player and Info */}
        <div className="w-3/4">
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${searchParams.get('v')}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>

          <div className="mt-5">
            <h1 className="text-2xl font-semibold">{title}</h1>
            <div className="flex items-center mt-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {channelProfilePic ? (
                    <img
                      src={channelProfilePic}
                      alt="Channel Profile"
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                  )}
                  <span className="text-lg font-medium">{channelTitle}</span>
                </div>
                <button className="px-4 py-2 bg-red-600 text-white rounded-md font-semibold">
                  Subscribe
                </button>
              </div>
              <div className="flex items-center gap-3 ml-auto">
                <button className="px-4 py-2 bg-gray-200 rounded-md font-medium">
                  👍 {likeCount}
                </button>
                <button className="px-4 py-2 bg-gray-200 rounded-md font-medium">
                  👎
                </button>
              </div>
            </div>
            <div className="text-gray-600 text-sm mt-2">{viewCount} views</div>
            <div className="mt-4 text-gray-700">
              <div
                className={`whitespace-pre-wrap overflow-hidden ${
                  showFullDescription ? '' : 'max-h-20'
                }`}
              >
                {description}
              </div>
              <button
                className="mt-2 text-blue-500 font-semibold"
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? 'View Less' : 'View More'}
              </button>
            </div>
          </div>

          <CommentsContainer />
        </div>

        {/* Live Chat Section */}
        <div className="w-1/4 pl-5">
          <LiveChat />
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
