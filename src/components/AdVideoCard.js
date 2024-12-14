import React, { useState } from "react";

const AdVideoCard = ({ VideoCard, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`m-2 w-72 shadow-lg relative transition-opacity duration-300 ease-in-out ${
        isHovered ? "opacity-100" : "opacity-75"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ad Overlay */}
      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-60 text-white flex items-center justify-center z-10">
          <span className="text-lg font-semibold">Ad</span>
        </div>
      )}
      {/* Video Card Component */}
      <div className="relative z-0">
        <VideoCard {...props} />
      </div>
    </div>
  );
};

export default AdVideoCard;
