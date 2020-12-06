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

export const getPopularMovies = () => {
    return fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=ea64de9bddd08b946b34a41ba227ce72&language=en-US&page=1",
        {
            method: "POST",
            headers: {
                "x-rapidapi-host": "fairestdb.p.rapidapi.com",
                "x-rapidapi-key": "apikey",
                "content-type": "application/json",
                accept: "application/json",
            },
            body: JSON.stringify({
                name: this.state.name,
                notes: this.state.notes,
            }),
        }
    )
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err);
        });
};

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
