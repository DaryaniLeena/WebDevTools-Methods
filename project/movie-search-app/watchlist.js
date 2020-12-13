let usersWatchlist = {
    "5f27b7db-8a29-4a2e-8c5d-79761cf7cccd": {
        movies: [],
    },
    "5f27b7db-8a29-4a2e-8c5d-79761cf7ccab": {
        movies: [],
    },
};

const removeMovie = (movieId, userid) => {
    // usersWatchlist[userid].movies = usersWatchlist[userid].movies.filter(
    //     function (item) {
    //         return item.id !== movieId;
    //     }
    // );
    // console.log("from remove");
    // console.log(usersWatchlist[userid].movies);

    usersWatchlist[userid].movies.splice(
        usersWatchlist[userid].movies.findIndex(function (item) {
            return item.id === movieId;
        }),
        1
    );
};
const addMovie = (movieDetail, userid) => {
    if (usersWatchlist[userid]) {
        usersWatchlist[userid].movies.push(movieDetail);
    } else {
        usersWatchlist[userid] = {
            movies: [movieDetail],
        };
    }
    console.log("add movie");
    console.log(usersWatchlist[userid]);
    console.log(".....");
};

module.exports = {
    usersWatchlist,
    removeMovie,
    addMovie,
};
