const userList = {};
const isValidSession = function (uid) {
    return userList[uid];
};

const validateUsername = function (username) {
    if (!username || username.toLowerCase().includes("dog") || username.includes(" ")) {
        return false;
    }
    return true;
};

const session = {
    userList,
    isValidSession,
    validateUsername,
};

module.exports = session;
