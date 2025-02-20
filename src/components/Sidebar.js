import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
    
    return (
        <div
            className={`h-full bg-white shadow-lg z-50 w-48 md:w-56 lg:w-64 
                        p-5 transition-all duration-300 ease-in-out 
                        ${isMenuOpen ? "block" : "hidden"} `}
        >
            {/* Navigation */}
            <ul className="space-y-2">
                <li>
                    <Link to="/" className="hover:text-blue-500">Home</Link>
                </li>
                <li className="hover:text-blue-500">Shorts</li>
                <li className="hover:text-blue-500">Subscriptions</li>
            </ul>

            {/* Subscriptions */}
            <h1 className="font-bold pt-5">Subscriptions</h1>
            <ul className="space-y-2">
                {["Music", "Sports", "Gaming", "Live", "Movies"].map((category) => (
                    <li key={category}>
                        <Link to={`/category/${category}`} className="hover:text-blue-500">
                            {category}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* User Section */}
            <h1 className="font-bold pt-5">You</h1>
            <ul className="space-y-2">
                <li className="hover:text-blue-500">History</li>
                <li className="hover:text-blue-500">Playlists</li>
                <li className="hover:text-blue-500">Your videos</li>
                <li className="hover:text-blue-500">Your courses</li>
                <li className="hover:text-blue-500">Watch later</li>
                <li className="hover:text-blue-500">Liked videos</li>
            </ul>
        </div>
    );
};

export default Sidebar;
