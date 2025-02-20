import React from "react";

const AdVideoCard = ({ VideoCard, ...props }) => {
  return (
    <div className="m-2 w-full sm:w-72 shadow-lg relative group transition-opacity duration-300 ease-in-out">
      {/* Ad Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 text-white flex items-center justify-center 
                      opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 
                      pointer-events-none z-10">
        <span className="text-lg font-semibold">Ad</span>
      </div>

      {/* Video Card Component */}
      <div className="relative z-0">
        <VideoCard {...props} />
      </div>
    </div>
  );
};

export default AdVideoCard;
