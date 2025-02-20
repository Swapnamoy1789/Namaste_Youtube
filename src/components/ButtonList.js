import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

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

const ButtonList = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

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

  const buttonNames = [
    "Movies",
    "Music",
    "Gaming",
    "Sports",
    "Technology",
    "Education",
    "Comedy",
    "News",
    "Health",
    "Travel",
    "Lifestyle",
  ];

  const handleCategoryClick = (category) => {
    if (category === "All") {
      navigate("/");
    } else {
      navigate(`/category/${category}`);
    }
  };

  return (
    <div className="relative w-full max-w-screen overflow-hidden z-10">
      {/* Left Scroll Button (Hidden on Small Screens) */}
      <button
        onClick={scrollLeft}
        className="hidden md:block absolute left-2 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-gray-200 hover:bg-gray-300 rounded-full shadow-md"
      >
        &#8249;
      </button>

      <div
        ref={scrollRef}
        className="flex w-full overflow-x-auto whitespace-nowrap scrollbar-hide space-x-4 px-4 sm:px-12 
                   snap-x snap-mandatory"
      >
        {buttonNames.map((name, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(name)}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg snap-center"
          >
            {name}
          </button>
        ))}
      </div>

      {/* Right Scroll Button (Hidden on Small Screens) */}
      <button
        onClick={scrollRight}
        className="hidden md:block absolute right-2 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-gray-200 hover:bg-gray-300 rounded-full shadow-md"
      >
        &#8250;
      </button>
    </div>
  );
};

export default ButtonList;
