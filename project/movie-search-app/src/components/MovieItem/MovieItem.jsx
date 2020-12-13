import React, { useState, useEffect } from "react";
import WatchlistButton from "../WatchList/WatchlistButton";
import "./MovieItem.css";
import { getAllGenres } from "../../services/service";
import { MOVIE_DB_IMAGE_URL } from "../../services/service";
import { Link } from "react-router-dom";
import noPhoto from "./noimage.png";

const MovieItem = ({ props, uid, withWatchListButton }) => {
    const { title, vote_average, poster_path, id } = props.element;
    const [genre, setGenre] = useState([]);
    let { genre_ids } = props.element;

    useEffect(() => {
        getAllGenres().then((data) => {
            setGenre(data.genres);
        });
    }, []);

    let genresStr = "";
    if (genre_ids) {
        genresStr = genre_ids
            .map((id) => {
                const item = genre.find((item) => item.id === id);
                return item ? item.name : null;
            })
            .join(", ");
    }

    // const history = useHistory();
    // genre_name = genre.map((department) => (
    //     <div key={department} className="dept-shape">
    //         {department}
    //     </div>
    // ));

    return (
        <div key={id} className="cardStyle">
            <Link to={`/movies/${id}`}>
                <img
                    className="imgHeight"
                    src={
                        poster_path
                            ? MOVIE_DB_IMAGE_URL.medium + poster_path
                            : noPhoto
                    }
                    alt={title}
                ></img>
            </Link>
            <div className="movie-detail">
                <div className="title">{title}</div>
                <div>{vote_average}</div>
                <div>{genresStr}</div>
                {withWatchListButton && (
                    <WatchlistButton
                        movieDetail={{
                            title: title,
                            vote_average: vote_average,
                            poster_path: poster_path,
                            id: id,
                        }}
                        uid={uid}
                    />
                )}
            </div>
        </div>
    );
};

export default MovieItem;
