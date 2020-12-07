import React from "react";
import { useState, useRef, useEffect } from "react";
import { getPopularMovies } from "../../services/service";

const SearchComponent = () => {
    console.log(movieType);
    const movieList = useRef([]);
    const [popularMovie, setPopularMovie] = useState([]);
    useEffect(() => {
        getPopularMovies(movieType).then((data) => {
            console.log(movieType);
            movieList.current = data;
            console.log(movieList.current);
            // setPopularMovieData(movieList.current);
        });
    }, [movieType]);

    return <h1>Popular Movies</h1>;
};
export default PopularMovies;
