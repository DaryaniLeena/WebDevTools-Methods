import React, { useState, useEffect, useRef, useCallback } from "react";
import { getUserWatchlist } from "../../services/service";
import Error from "../Error/Error";
import MovieItem from "../MovieItem/MovieItem";
import "./WatchList.css";

const ViewWatchList = ({ props }) => {
    const id = props.uid;
    const savedList = useRef([]);
    const [watchlist, setWatchlist] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        getUserWatchlist(id).then((data) => {
            if (data) {
                savedList.current = data;
                console.log(savedList.current);
                updatewatchlist(savedList.current.movies);
            } else {
                setMessage("You dont have movies in your watchlist");
            }
        });
    }, []);

    const updatewatchlist = useCallback((obj) => {
        setWatchlist(
            obj.map((element) => (
                <MovieItem
                    key={element.id}
                    props={{ element }}
                    withWatchListButton
                />
            ))
        );
    });
    return (
        <div>
            <div className="movie-container">
                {watchlist == "" ? (
                    <div className="error-mess">
                        <Error
                            message={"You dont have movies in your watchlist"}
                        />
                    </div>
                ) : (
                    watchlist
                )}
            </div>
        </div>
    );
};

export default ViewWatchList;
