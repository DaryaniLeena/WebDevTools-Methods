import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
    getUserWatchlist,
    addMovietoWatchList,
    removeMovieFromWatchlist,
} from "../../services/service";
const ButtonWatchList = function ({ movieDetail, uid }) {
    const [presentInwatchlist, setpresentInwatchlist] = useState(false);
    const [watchList, setWatchList] = useState([]);

    const history = useHistory();

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
                        setpresentInwatchlist(true);
                    }
                })
                .catch((error) => {
                    setpresentInwatchlist(false);
                    console.log("error in getting watchlist");
                });
        }
    }, [movieDetail]);

    const addToWatchlist = () => {
        addMovietoWatchList(movieDetail, uid)
            .then((response) => {
                setpresentInwatchlist(true);
            })
            .catch(function (err) {
                console.log("error in adding movie to watchlist");
            });
    };

    const removeFromWatchlist = () => {
        removeMovieFromWatchlist(uid, movieDetail.id)
            .then((response) => {
                setpresentInwatchlist(false);
            })
            .catch(function (err) {
                console.log("error in removing movie to watchlist");
            });
    };

    if (!presentInwatchlist) {
        return (
            <button
                className="watchlistButton"
                onClick={addToWatchlist}
                id="watchlist-btn"
            >
                Add To my watchlist
            </button>
        );
    } else {
        return (
            <button
                className="watchlistButton"
                onClick={removeFromWatchlist}
                id="watchlist-btn"
            >
                Remove from my watchlist
            </button>
        );
    }
};
export default ButtonWatchList;
