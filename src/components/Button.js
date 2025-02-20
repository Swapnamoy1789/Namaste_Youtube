import React from "react";
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

const Button = ({ name }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (name === "All") {
      navigate("/");
    } else {
      const categoryId = CATEGORY_IDS[name];
      if (categoryId) {
        navigate(`/category/${categoryId}`);
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-3 sm:px-4 py-1 sm:py-2 bg-gray-200 hover:bg-gray-300 rounded-full 
                 text-xs sm:text-sm font-medium focus:outline-none transition-all duration-200"
      aria-label={`Navigate to ${name}`}
    >
      {name}
    </button>
  );
};

export default Button;
