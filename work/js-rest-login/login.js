const sessions = {
    11: {
        username: "Amit",
        uid: 11,
        current: false,
    },
    43: {
        username: "Bao",
        uid: 43,
        current: false,
    },
};

const isValidSession = function (sid) {
    return sessions[sid];
};

const validateUsername = function (username) {
    if (!username || (username.toLowerCase()).includes("dog") || username.includes(" ")) {
        return false;
    }
    return true;
};

const login = {
    sessions,
    isValidSession,
    validateUsername
}

module.exports = login;
