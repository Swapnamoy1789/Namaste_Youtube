import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";
import { useNavigate } from "react-router-dom";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchCache = useSelector((store) => store.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    if (!searchQuery) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions(controller.signal);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    try {
      const response = await fetch(YOUTUBE_SEARCH_API + searchQuery);
      const text = await response.text();
      const match = text.match(/window\.google\.ac\.h\((\[.*\])\)/);

      if (match && match[1]) {
        const parsedData = JSON.parse(match[1]);
        const suggestionsArray = parsedData[1].map((item) => item[0]);

        setSuggestions(suggestionsArray);
        dispatch(cacheResults({ [searchQuery]: suggestionsArray }));
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    navigate(`/search/${suggestion}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-between items-center p-4 shadow-md bg-white relative z-20">
      {/* Sidebar Menu & Logo */}
      <div className="flex items-center">
        <img
          onClick={() => dispatch(toggleMenu())}
          className="h-8 w-8 cursor-pointer"
          alt="menu"
          src="https://img.icons8.com/ios-filled/50/menu.png"
        />
        <a href="/" className="ml-2">
          <img
            className="h-6 sm:h-8 hidden sm:block"
            alt="youtube-logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png"
          />
        </a>
      </div>

      {/* Search Bar */}
      <div className="relative flex-grow max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg" ref={searchRef}>
        <div className="flex">
          <input
            className="px-4 py-1 sm:py-2 w-full border border-gray-400 rounded-l-full focus:outline-none text-sm"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search..."
          />
          <button
            className="border border-gray-400 px-4 sm:px-5 py-1 sm:py-2 rounded-r-full bg-gray-100 hover:bg-gray-200 transition-all duration-200"
            onClick={handleSearch}
          >
            🔍
          </button>
        </div>

        {/* Search Suggestions Dropdown */}
        {showSuggestions && searchQuery && (
          <div
            className="absolute bg-white py-2 px-2 min-w-[200px] sm:w-1/2 md:w-1/3 shadow-lg rounded-lg 
                      border border-gray-100 z-50 max-h-60 overflow-y-auto transition-all duration-200"
            style={{ top: "100%" }}
          >
            <ul>
              {suggestions.length > 0 ? (
                suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="py-2 px-3 shadow-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    🔍 {suggestion}
                  </li>
                ))
              ) : (
                <li className="py-2 px-3 text-gray-500">No suggestions found.</li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* User Icon */}
      <div className="flex items-center ml-2">
        <img
          className="h-8 w-8 cursor-pointer"
          alt="user"
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        />
      </div>
    </div>
  );
};

export default Head;
