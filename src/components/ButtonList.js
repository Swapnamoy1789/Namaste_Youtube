import React, { useRef } from "react";
import Button from "./Button";

const ButtonList = () => {
  // Reference for the scrollable container
  const scrollRef = useRef(null);

  // Scroll handlers
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // List of button names
  const buttonNames = [
    "All",
    "Movies",
    "Podcasts",
    "Premier League",
    "News",
    "Music",
    "Live",
    "Trending",
    "Gaming",
    "Technology",
    "Education",
    "Comedy",
    "Lifestyle",
    "Fashion",
    "Health",
    "Travel",
    "Sports",
  ];

  return (
    <div className="relative w-full max-w-screen overflow-hidden z-10">
      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-gray-200 hover:bg-gray-300 rounded-full shadow-md"
      >
        &#8249;
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex w-full overflow-x-auto whitespace-nowrap scrollbar-hide space-x-4 px-12"
        style={{ zIndex: 10 }}
      >
        {buttonNames.map((name, index) => (
          <Button key={index} name={name} />
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-gray-200 hover:bg-gray-300 rounded-full shadow-md"
      >
        &#8250;
      </button>
    </div>
  );
};

export default ButtonList;
