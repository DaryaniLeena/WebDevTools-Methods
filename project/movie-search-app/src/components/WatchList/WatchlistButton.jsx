import React from "react";
import { useState, useEffect } from "react";
import "./WatchList.css";
import {
    getUserWatchlist,
    addMovietoWatchList,
    removeMovieFromWatchlist,
} from "../../services/service";

const WatchlistButton = ({ uid, movieDetail }) => {
    const [watchList, setWatchList] = useState([]);
    const [isInWatchList, setisInWatchList] = useState(false);

    useEffect(() => {
        if (uid) {
            getUserWatchlist(uid)
                .then((obj) => {
                    setWatchList(obj.movies);
                    if (
                        uid &&
                        watchList.some(
                            (movie) => movie["id"] === movieDetail.id
                        )
                    ) {
                        setisInWatchList(true);
                    }
                })
                .catch((error) => {
                    setisInWatchList(false);
                    console.log("error in getting watchlist");
                });
        }
    }, [uid, movieDetail]);

    const clickWatchListHandler = (isInWatchList) => {
        if (!uid) return false;
        if (!isInWatchList) {
            console.log("is not in watchlist , need to add");
            addMovietoWatchList({ movieDetail, uid })
                .then((response) => {
                    console.log("added to watchlist");
                })
                .catch(function (err) {
                    console.log("error in adding movie to watchlist");
                });
        } else {
            console.log("is in watchlist , can be removed");
            removeMovieFromWatchlist({ uid, movieDetail })
                .then((response) => {
                    console.log("removed from watchlist");
                })
                .catch(function (err) {
                    console.log("error in removing movie to watchlist");
                });
        }
    };
    // let isInWatchList =
    //     uid && watchList.some((movie) => movie["id"] === movieDetail.id);

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
