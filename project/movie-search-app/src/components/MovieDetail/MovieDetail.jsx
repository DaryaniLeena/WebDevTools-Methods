import React from "react";
import { useState, useEffect } from "react";
import { getMovieDetails } from "../../services/service";
import WatchListButton from "../WatchList/WatchlistButton";
import ButtonWatchList from "../WatchList/ButtonWatchList";
import { MOVIE_DB_IMAGE_URL } from "../../services/service";
import "./MovieDetail.css";
import {
    getUserWatchlist,
    addMovietoWatchList,
    removeMovieFromWatchlist,
} from "../../services/service";
// import MovieDetail from "./MovieDetail";
// const wishlist = require("../../../watchlist");

const MovieDetail = ({ movieid, uid }) => {
    const [watchList, setWatchList] = useState([]);
    console.log("movieid");
    console.log(movieid);
    const getDurationStr = (mins) => {
        let h = Math.floor(mins / 60);
        let m = mins % 60;
        m = m < 10 ? "0" + m : m;
        return `${h}h ${m}m`;
    };
    const getReleaseDateStr = (str) => {
        const date = new Date(str);
        return (
            date.getDate() +
            "." +
            (date.getMonth() + 1) +
            "." +
            date.getFullYear()
        );
    };

    const [movieDetail, setMovieDetail] = useState({});

    useEffect(() => {
        getMovieDetails(movieid)
            .then((data) => {
                setMovieDetail(data);
            })
            .catch((err) => console.log("error in movie detail"));
    }, []);
    console.log(movieDetail);
    const budgetStr = movieDetail.budget;
    const durationStr = getDurationStr(movieDetail.runtime);
    // let genresStr = "";
    // if (genre_ids) {
    //     genresStr = genre_ids
    //         .map((id) => {
    //             const item = genre.find((item) => item.id === id);
    //             return item ? item.name : null;
    //         })
    //         .join(", ");
    // }
    // const addMovieToUserWishList = function () {
    //     if (wishlist.wishlist[uid]) {
    //         wishlist.wishlist[uid].movies.push(movieDetail);
    //     } else {
    //         wishlist.wishlist[uid] = {
    //             movies: [movieDetail],
    //         };
    //         // userTodos[username] = { username, todos: [] };
    //     }
    // wishlist[uid].movies.push(movieDetail);

    // console.log(wishlist);
    // };

    // const addMovieTowatchlist = () => {
    //     getUserWatchlist(uid)
    //         .then((obj) => {
    //             setWatchList(obj.movies);
    //         })
    //         .catch((error) => {
    //             console.log("error in getting watchlist");
    //         });
    // };

    if (!movieDetail || movieDetail.id !== Number(movieid)) {
        return <div>Loading....</div>;
    }
    return (
        <div className="movie-detail-container">
            <div
                className="cover-moviedetail"
                style={{
                    backgroundSize: "cover",
                    backgroundImage: `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0, .5)), url("${
                        MOVIE_DB_IMAGE_URL.large + movieDetail.backdrop_path
                    }")`,
                }}
            />
            <div className="detail-container">
                <div className="movie-poster">
                    <img
                        src={`${
                            MOVIE_DB_IMAGE_URL.medium + movieDetail.poster_path
                        }`}
                        alt={movieDetail.title}
                        className="movie__img"
                    />
                </div>
                <div className="movie-all-details">
                    <div className="row-title">
                        <h2 className="moviedetail-title">
                            {movieDetail.title}
                        </h2>
                        <div className="rating-container">
                            {movieDetail.vote_average}
                        </div>
                    </div>
                    <div className="tagline">
                        <div>{movieDetail.tagline}</div>
                    </div>
                    <div className="movie__control">
                        <ButtonWatchList movieDetail={movieDetail} uid={uid} />
                    </div>
                    <p className="movie-overview">{movieDetail.overview}</p>

                    <div className="genre-conatiner">
                        <span>Genres:</span>
                        {movieDetail.genres.map((o) => (
                            <span className="genres-name" key={`g${o.id}`}>
                                {o.name}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="movie-all-details release-conatiner">
                    <div className="release-detail">
                        Release Date:
                        {getReleaseDateStr(movieDetail.release_date)}
                    </div>
                    <div className="release-detail">
                        Duration: {durationStr}
                    </div>
                    <div className="release-detail">Budget: ${budgetStr}</div>
                </div>
            </div>
        </div>
    );
};
export default MovieDetail;
