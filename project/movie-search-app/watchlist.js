let usersWatchlist = {
    "5f27b7db-8a29-4a2e-8c5d-79761cf7cccd": {
        movies: [],
    },
    "5f27b7db-8a29-4a2e-8c5d-79761cf7ccab": {
        movies: [],
    },
};

const removeMovie = (movieId, userid) => {
    usersWatchlist[userid].movies = usersWatchlist[userid].movies.filter(
        function (item) {
            return item.id !== movieId;
        }
    );
};
const addMovie = (movieId, userid) => {
    usersWatchlist[userid].movies = usersWatchlist[userid].movies.filter(
        function (item) {
            return item.id !== movieId;
        }
    );
};

module.exports = {
    usersWatchlist,
    removeMovie,
    addMovie,
};
