import React from "react";
import { useState, useEffect } from "react";
import { getMovieDetails } from "../../services/service";
import WatchlistButton from "../WatchList/WatchlistButton";
// import MovieDetail from "./MovieDetail";
// const wishlist = require("../../../watchlist");

const MovieDetail = ({ movieid, uid }) => {
    console.log("movieid");
    console.log(movieid);
    const [movieDetail, setMovieDetail] = useState({});

    useEffect(() => {
        getMovieDetails(movieid)
            .then((data) => {
                setMovieDetail(data);
            })
            .catch((err) => console.log("error in movie detail"));
    }, []);
    console.log(movieDetail);
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
    return (
        <div>
            <div class="overview">{movieDetail.overview}</div>
            <div>
                <div>
                    <WatchlistButton
                        uid={uid}
                        movieDetail={movieDetail}
                    ></WatchlistButton>
                </div>
                <div></div>
            </div>
        </div>
    );
};
export default MovieDetail;
