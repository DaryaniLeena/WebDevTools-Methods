export const MOVIE_DB_IMAGE_URL = {
    small: "https://image.tmdb.org/t/p/w185",
    medium: "https://image.tmdb.org/t/p/w300",
    large: "https://image.tmdb.org/t/p/w1280",
    original: "https://image.tmdb.org/t/p/original",
};
export const checkSession = () => {
    return fetch("/session", {
        method: "GET",
    })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then((err) => Promise.reject(err));
        });
};

export const createSession = ({ username }) => {
    return fetch("/session", {
        method: "POST",
        headers: new Headers({
            "content-type": "application/json",
        }),
        body: JSON.stringify({ username }),
    })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then((err) => Promise.reject(err));
        });
};

export const endSession = () => {
    return fetch("/session", {
        method: "DELETE",
    })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then((err) => Promise.reject(err));
        });
};

//misc_latest: this.base + '/movie/latest?api_key=' + this.api_key
// , misc_upcoming: this.base + '/movie/upcoming?page={0}&api_key=' + this.api_key
export const getPopularMovies = (movieType) => {
    console.log({ movieType });
    let url =
        "https://api.themoviedb.org/3/movie/" +
        movieType +
        "?api_key=ea64de9bddd08b946b34a41ba227ce72&language=en-US&page=1";
    return fetch(url, {
        method: "GET",
        headers: new Headers({
            "content-type": "application/json",
        }),
    })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then((err) => Promise.reject(err));
        });
};
// export const getSearchMovies = () => {
//     let url =
//         "https://api.themoviedb.org/3/movie/" +
//         movieType +
//         "?api_key=ea64de9bddd08b946b34a41ba227ce72&language=en-US&page=1";
//     return fetch(url, {
//         method: "GET",
//         headers: new Headers({
//             "content-type": "application/json",
//         }),
//     })
//         .then((response) => response.json())
//         .then((response) => {
//             console.log(response);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// };

// https://api.themoviedb.org/3/genre/movie/list?api_key=ea64de9bddd08b946b34a41ba227ce72&language=en-US
export const getAllGenres = () => {
    let url =
        "https://api.themoviedb.org/3/genre/movie/list?api_key=ea64de9bddd08b946b34a41ba227ce72&language=en-US";
    return fetch(url, {
        method: "GET",
        headers: new Headers({
            "content-type": "application/json",
        }),
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err);
        });
};

// export const getTopRated = () => {
//     return fetch(
//         "https://api.themoviedb.org/3/movie/top_rated?api_key=ea64de9bddd08b946b34a41ba227ce72&language=en-US&page=1",
//         {
//             method: "GET",
//             headers: new Headers({
//                 "content-type": "application/json",
//             }),
//         }
//     )
//         .then((response) => response.json())
//         .then((response) => {
//             console.log(response);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// };
// export const getNowPlayingMovies = () => {
//     return fetch(
//         "https://api.themoviedb.org/3/movie/now_playing?api_key=ea64de9bddd08b946b34a41ba227ce72&language=en-US&page=1",
//         {
//             method: "GET",
//             headers: new Headers({
//                 "content-type": "application/json",
//             }),
//         }
//     )
//         .then((response) => response.json())
//         .then((response) => {
//             console.log(response);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// };
// export const getUpcomingMovies = () => {
//     return fetch(
//         "https://api.themoviedb.org/3/movie/upcoming?api_key=ea64de9bddd08b946b34a41ba227ce72&language=en-US&page=1",
//         {
//             method: "GET",
//             headers: new Headers({
//                 "content-type": "application/json",
//             }),
//         }
//     )
//         .then((response) => response.json())
//         .then((response) => {
//             console.log(response);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// };

// export const getActiveUsers = () => {
//     return fetch("/users")
//         .catch(() => Promise.reject({ error: "network-error" }))
//         .then((response) => {
//             if (response.ok) {
//                 return response.json();
//             }
//             return response.json().then((err) => Promise.reject(err));
//         });
// };

// export const getAllMessages = () => {
//     return fetch("/messages")
//         .catch(() => Promise.reject({ error: "network-error" }))
//         .then((response) => {
//             if (response.ok) {
//                 return response.json();
//             }
//             return response.json().then((err) => Promise.reject(err));
//         });
// };

// export const sendMessage = ({ userName, message }) => {
//     return fetch("/message/" + userName, {
//         method: "POST",
//         headers: new Headers({ "content-type": "application/json" }),
//         body: JSON.stringify({ message }),
//     })
//         .catch(() => Promise.reject({ error: "network-error" }))
//         .then((response) => {
//             if (response.ok) {
//                 return Promise.resolve(response);
//             }
//             return response.json().then((err) => Promise.reject(err));
//         });
// };
