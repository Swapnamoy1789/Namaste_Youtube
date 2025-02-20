import React from "react";

const VideoCard = ({ info }) => {
  if (!info || !info.snippet) {
    return <p className="text-red-500">Invalid video data</p>;
  }

  const { snippet, statistics, viewCount } = info;
  const { channelTitle, title, thumbnails } = snippet;

  const finalViewCount = statistics?.viewCount || viewCount;

  return (
    <div className="p-2 m-2 w-full sm:w-64 md:w-72 shadow-lg rounded-lg transition-transform transform hover:scale-105">
      {/* Thumbnail */}
      <img
        className="rounded-md w-full h-auto object-contain"
        alt="thumbnail"
        src={thumbnails?.medium?.url}
      />

      {/* Video Details */}
      <ul className="mt-2">
        <li className="font-bold py-1 truncate">{title}</li>
        <li className="text-sm text-gray-500">{channelTitle}</li>
        <li className="text-xs text-gray-600">
          {finalViewCount ? `${finalViewCount} views` : "No views available"}
        </li>
      </ul>
    </div>
  );
};

export default VideoCard;
