const login = require("./login");
const todos = {
  Amit: {
    username: "Amit",
    todos: [
      {
        task: "buy vegetable",
        done: false,
        id: 1,
      },
    ],
  },
  Bao: {
    username: "Bao",
    todos: [
      {
        task: "buy fruits",
        done: false,
        id: 2,
      },
    ],
  },
};

function userExists(username) {
  const record = Object.values(login.sessions).find(
    (user) => user.username === username
  );
  return record && record.uid;
}

//   export const performLogin = function (username) {
const addUser = function (username) {
  // In real world, use a uuid/guid instead

  const oldId = userExists(username);
  // console.log(oldId);
  const id = oldId || Math.floor(Math.random() * 10000);
  login.sessions[id] = { username, uid: id, current: true };
  if (!todos[username]) {
    todos[username] = { username, todos: [] };
  }
  return id;
};

const counter = () => {
  let count = 2; // so that itemid starts from 3, i & 2 is already given for first two items
  return () => {
    count += 1;
    return count;
  };
};
let nextID = counter();

const user = {
  todos,
  nextID,
  addUser,
};

module.exports = user;
