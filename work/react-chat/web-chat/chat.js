const users = {
    1: {
        sender: "Amit",
        uid: 1,
    },
    2: { sender: "Bao", uid: 2 },
};

const messages = [
    {
        sender: "Amit",
        timestamp: new Date("2020-11-28 19:20:00").toUTCString(),
        text: "You up?",
    },
    {
        sender: "Bao",
        timestamp: new Date("2020-11-28 19:21:00").toUTCString(),
        text:
            "Yeah, still working on this INFO6250 work, but I keep getting distracted by cat videos",
    },
];

function addMessage({ sender, timestamp, text }) {
    let obj = { sender: sender, timestamp: timestamp, text: text };
    messages.push(obj);
}

function isExistingUser(username) {
    let found = false;
    console.log(users);
    users.forEach((user) => {
        if (user.sender === username) {
            found = true;
        }
    });
    return found;
}

function userExists(username) {
    const record = Object.values(users).find(
        (user) => user.sender === username
    );
    return record && record.uid;
}
const addUser = function (username) {
    const oldId = userExists(username);
    const id = oldId || Math.floor(Math.random() * 10000);
    users[id] = { sender: username, uid: id };
    return id;
};
const isValid = function (sid) {
    return users[sid];
};
const remove = function (sid) {
    delete users[sid];
};

const chekusername = function (username) {
    if (!username) {
        return false;
    }
    if (!isValidUsername(username)) {
        return false;
    }
    return true;
};

const isValidUsername = function (username) {
    if (
        !username ||
        username.toLowerCase().includes("dog") ||
        username.includes(" ")
    ) {
        return false;
    }
    return true;
};

const chat = {
    users,
    messages,
    isExistingUser,
    addUser,
    isValid,
    chekusername,
    remove,
    addMessage,
};

module.exports = chat;
