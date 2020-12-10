import React, { useState, useEffect } from "react";
import "./MovieItem.css";
import { getAllGenres } from "../../services/service";
import { MOVIE_DB_IMAGE_URL } from "../../services/service";
import { Link } from "react-router-dom";

const MovieItem = ({ props }) => {
    console.log(props);
    const { title, vote_average, poster_path, id } = props.element;
    const [message, setMessage] = useState("");
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

    const x = ["q", "b", "c"];
    const genre_name = x.map((item) => (
        <div className="rating" key={item}>
            {item}
        </div>
    ));

    // const history = useHistory();
    // genre_name = genre.map((department) => (
    //     <div key={department} className="dept-shape">
    //         {department}
    //     </div>
    // ));

    return (
        <div className="cardStyle">
            <Link to={`/movies/${id}`}>
                <img
                    src={MOVIE_DB_IMAGE_URL.medium + poster_path}
                    alt={title}
                ></img>
            </Link>
            <div class="movie-detail">
                <div className="title">{title}</div>
                <div>{vote_average}</div>
                <div>{genresStr}</div>
            </div>
        </div>
    );
};

export default MovieItem;
