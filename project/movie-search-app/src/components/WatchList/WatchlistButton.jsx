import React from "react";
import { useState, useEffect } from "react";
import {
    getUserWatchlist,
    addMovietoWatchList,
    removeMovieFromWatchlist,
} from "../../services/service";

const WatchlistButton = ({ uid, movieDetail }) => {
    const [watchList, setWatchList] = useState([]);
    useEffect(() => {
        if (uid) {
            getUserWatchlist(uid)
                .then((obj) => {
                    setWatchList(obj.movies);
                })
                .catch((error) => {
                    console.log("error in getting watchlist");
                });
        }
    }, []);
    // const clickWatchListHandler = (isInWatchList) => {
    //     if (!uid) return false;
    //     if (!isInWatchList) {
    //         if (wishlist.usersWatchlist[uid]) {
    //             wishlist.usersWatchlist[uid].movies.push(movieDetail);
    //         } else {
    //             wishlist.usersWatchlist[uid] = {
    //                 movies: [movieDetail],
    //             };
    //         }
    //     } else {
    //         removeMovieWatchList(movieDetail.id, uid);
    //     }
    // };
    // isInWatchList =
    // uid &&
    // wishlist.usersWatchlist[uid] &&
    // wishlist.usersWatchlist[uid].movies.some(
    //     (movie) => movie["id"] === movieDetail.id
    // );

    const clickWatchListHandler = (isInWatchList) => {
        if (!uid) return false;
        if (!isInWatchList) {
            addMovietoWatchList({ movieDetail, uid })
                .then((response) => {})
                .catch(function (err) {
                    console.log("error in adding movie to watchlist");
                });
        } else {
            removeMovieFromWatchlist({ uid, movieDetail })
                .then((response) => {})
                .catch(function (err) {
                    console.log("error in removing movie to watchlist");
                });
        }
    };
    const isInWatchList =
        uid && watchList.some((movie) => movie["id"] === movieDetail.id);

    // const removeMovieWatchList = (movieid, userid) => {
    //     wishlist.usersWatchlist[userid].movies = wishlist.usersWatchlist[
    //         userid
    //     ].movies.filter(function (item) {
    //         return item.id !== movieid;
    //     });
    // };

    return (
        <button
            className="watchlistButton"
            onClick={clickWatchListHandler}
            id="watchlist-btn"
        >
            {isInWatchList ? "Remove from my Watchlist" : "Add to my Watchlist"}
        </button>
    );
};
export default WatchlistButton;
