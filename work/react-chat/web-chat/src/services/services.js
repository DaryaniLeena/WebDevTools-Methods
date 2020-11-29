export const checkSession = () => {
    return fetch("/api/session", {
        method: "GET",
    })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then((json) => Promise.reject(json));
        });
};

export const createSession = ({ username }) => {
    return fetch("/api/session", {
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
            return response.json().then((json) => Promise.reject(json));
        });
};

export const endSession = () => {
    return fetch("/api/session", {
        method: "DELETE",
    })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then((json) => Promise.reject(json));
        });
};

export const addUser = ({ username }) => {
    return fetch("/users", {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify({ username }),
    })
        .catch((err) => {
            return Promise.reject({ err: "network-issue", details: err });
        })
        .then((response) => {
            if (response.ok) {
                return Promise.resolve(response);
            }
            return Promise.reject({
                err: "server-error",
                details: response.statusCode,
            });
        });
};

export const getUsers = () => {
    return fetch("/users")
        .catch((err) => {
            return Promise.reject({ err: "network-issue", details: err });
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject({
                err: "server-error",
                details: response.statusCode,
            });
        });
};

export const getMessages = () => {
    return fetch("/messages")
        .catch((err) => {
            return Promise.reject({ err: "network-issue", details: err });
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject({
                err: "server-error",
                details: response.statusCode,
            });
        });
};

export const sendMessage = ({ user, message }) => {
    return fetch("/messages/" + user, {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify({ message }),
    })
        .catch((err) => {
            return Promise.reject({ err: "network-issue", details: err });
        })
        .then((response) => {
            if (response.ok) {
                return Promise.resolve(response);
            }
            return Promise.reject({
                err: "server-error",
                details: response.statusCode,
            });
        });
};
