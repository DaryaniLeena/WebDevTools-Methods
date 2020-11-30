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
            return response.json().then((err) => Promise.reject(err));
        });
};

export const getActiveUsers = () => {
    return fetch("/users")
        .catch((err) => {
            return Promise.reject({ err: "network-issue", details: err });
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then((err) => Promise.reject(err));
        });
};

export const getAllMessages = () => {
    return fetch("/messages")
        .catch((err) => {
            return Promise.reject({ err: "network-issue", details: err });
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then((err) => Promise.reject(err));
        });
};

export const sendMessage = ({ userName, message }) => {
    return fetch("/message/" + userName, {
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
            return response.json().then((err) => Promise.reject(err));
        });
};
