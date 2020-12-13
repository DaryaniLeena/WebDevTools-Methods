import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { getSearchedMovie } from "../../services/service";
import MovieItem from "../MovieItem/MovieItem";

const PopularMovies = ({ query, uid }) => {
    const movie = useRef([]);
    const [MovieList, setMovieList] = useState([]);
    const [popularMovie, setPopularMovie] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    useEffect(() => {
        getSearchedMovie(query)
            .then((data) => {
                console.log(data.results);
                setMovieData(data.results);
            })
            .catch((err) => console.log("error in search"));
    }, [query]);

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
