import React from "react";
import { Link } from "react-router-dom";
import "./MovieNav.css";

const MovieNav = () => {
    return (
        <ul>
            <li>
                <Link to="/">Popular</Link>
            </li>
            <li>
                <Link to="/topRatedMovie">Top Rated</Link>
            </li>
            <li>
                <Link to="/nowPlayingMovie">Now Playing</Link>
            </li>
            <li>
                <Link to="/upcomingMovie">Upcoming</Link>
            </li>
        </ul>
    );
};

export default MovieNav;
