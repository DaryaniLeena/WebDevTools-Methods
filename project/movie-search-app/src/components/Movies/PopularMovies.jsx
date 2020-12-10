import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { getPopularMovies } from "../../services/service";
import MovieItem from "../MovieItem/MovieItem";

const PopularMovies = ({ movieType }) => {
    console.log(movieType);
    const movie = useRef([]);
    const [MovieList, setMovieList] = useState([]);
    const [popularMovie, setPopularMovie] = useState([]);
    useEffect(() => {
        getPopularMovies(movieType).then((data) => {
            movie.current = data;
            console.log(movie.current);
            setMovieData(movie.current.results);
        });
    }, [movieType]);

    const setMovieData = useCallback((obj) => {
        setMovieList(obj.map((element) => <MovieItem props={{ element }} />));
    });

    return <div className="movie-container">{MovieList}</div>;
};
export default PopularMovies;
