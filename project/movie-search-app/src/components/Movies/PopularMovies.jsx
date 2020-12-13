import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { getPopularMovies } from "../../services/service";
import MovieItem from "../MovieItem/MovieItem";

const PopularMovies = ({ movieType, uid }) => {
    const movie = useRef([]);
    const [MovieList, setMovieList] = useState([]);
    const [popularMovie, setPopularMovie] = useState([]);
    useEffect(() => {
        getPopularMovies(movieType).then((data) => {
            movie.current = data;
            setMovieData(movie.current.results);
        });
    }, [movieType]);

    const setMovieData = useCallback((obj) => {
        setMovieList(
            obj.map((element) => (
                <MovieItem key={element.id} props={{ element }} uid={uid} />
            ))
        );
    });

    return <div className="movie-container">{MovieList}</div>;
};
export default PopularMovies;
